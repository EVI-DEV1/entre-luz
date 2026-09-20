# Entre Luz

Uma landing page narrativa sobre dor emocional, autocrítica, sobrevivência e reconstrução. O conteúdo foi tratado como expressão pessoal e não como afirmações factuais.

## Tecnologias

- React
- TypeScript
- Vite

## Executar localmente

```bash
npm install
npm run dev
```

## Produção

```bash
npm run build
```

## Íris — chat de acolhimento

Íris é um chat de acolhimento com IA. As mensagens só são enviadas após a pessoa aceitar o aviso de privacidade no próprio chat. Não há armazenamento de conversas neste projeto.

Para ativá-la na Vercel, adicione a variável de ambiente `OPENAI_API_KEY` nas configurações do projeto. A chave fica apenas no servidor, na rota `api/chat.ts`, e nunca deve ser publicada no GitHub ou inserida no código do navegador. Use `.env.example` somente como referência local.

Íris não substitui atendimento profissional ou emergência. O chat direciona situações de risco imediato para o CVV (188) e SAMU (192).
