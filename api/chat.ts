type ChatMessage = { role: 'assistant' | 'user'; content: string }

const MAX_MESSAGES = 12
const MAX_MESSAGE_LENGTH = 1600
const crisisPattern = /suicid|me matar|me machucar|automutil|quero morrer|n[aã]o quero viver|acabar com tudo|tirar minha vida/i
const visits = new Map<string, number[]>()

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

function isRateLimited(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const recent = (visits.get(ip) ?? []).filter((time) => now - time < 60_000)
  recent.push(now)
  visits.set(ip, recent)
  return recent.length > 12
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') return json({ error: 'Método não permitido.' }, 405)
  if (isRateLimited(request)) return json({ error: 'Muitas mensagens em pouco tempo. Aguarde um instante.' }, 429)

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return json({ error: 'A Íris ainda não foi configurada.' }, 503)

  try {
    const body = await request.json() as { messages?: unknown }
    if (!Array.isArray(body.messages)) return json({ error: 'Mensagem inválida.' }, 400)

    const messages = body.messages
      .filter((message): message is ChatMessage => Boolean(message) && typeof message === 'object' && ((message as ChatMessage).role === 'assistant' || (message as ChatMessage).role === 'user') && typeof (message as ChatMessage).content === 'string')
      .slice(-MAX_MESSAGES)
      .map((message) => ({ role: message.role, content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH) }))
      .filter((message) => message.content.length > 0)

    const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content ?? ''
    if (!latestUserMessage) return json({ error: 'Mensagem inválida.' }, 400)

    if (crisisPattern.test(latestUserMessage)) {
      return json({ reply: 'Sinto muito que esteja tão pesado agora. Sua segurança importa mais do que resolver tudo de uma vez. Se houver risco de você se machucar, ligue para o CVV no 188 (24h e gratuito), chame alguém de confiança para ficar com você ou acione o SAMU no 192 em uma emergência. Você consegue ir para um lugar mais seguro e avisar uma pessoa agora?' })
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        store: false,
        max_output_tokens: 360,
        instructions: `Você é Íris, uma assistente de acolhimento emocional em português do Brasil. Converse de forma calorosa, natural, respeitosa e humana, sem afirmar ser humana nem profissional de saúde. Escute antes de aconselhar. Ajude a pessoa a nomear o que sente e proponha, no máximo, um próximo passo pequeno e realista. Não diagnostique, não prescreva tratamento, não dê conselhos médicos, jurídicos ou financeiros como autoridade e não julgue. Não incentive dependência: encoraje redes reais de apoio e ajuda profissional quando fizer sentido. Se houver qualquer sinal de risco de suicídio, autoagressão ou perigo imediato, priorize segurança: diga para ligar 188 (CVV, Brasil), acionar 192 (SAMU) numa emergência e procurar uma pessoa de confiança ou local seguro. Nunca descreva métodos de autoagressão. Mantenha respostas curtas (até 3 parágrafos), claras e acolhedoras.`,
        input: messages.map((message) => ({ role: message.role, content: [{ type: 'input_text', text: message.content }] })),
      }),
    })

    if (!response.ok) return json({ error: 'Não foi possível gerar uma resposta agora.' }, 502)
    const data = await response.json() as { output_text?: string }
    const reply = data.output_text?.trim()
    if (!reply) return json({ error: 'Não foi possível gerar uma resposta agora.' }, 502)
    return json({ reply })
  } catch {
    return json({ error: 'Não foi possível processar a mensagem.' }, 500)
  }
}
