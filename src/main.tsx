import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const shards = [
  { text: '“eu não pertenço”', theme: 'O medo de não caber', reflection: 'Quando um espaço parece hostil, é fácil concluir que o problema é existir nele. Mas pertencimento não exige que você diminua sua voz, sua história ou a sua presença.', cls: 'shard shard-one' },
  { text: '“preciso ser menor”', theme: 'A urgência de se apagar', reflection: 'Tentar ser invisível pode parecer proteção. Ainda assim, seus limites, desejos e necessidades não são excessos: são sinais de alguém que merece ser escutada.', cls: 'shard shard-two' },
  { text: '“ninguém fica”', theme: 'A solidão que pesa', reflection: 'A ausência de algumas pessoas não define a sua capacidade de criar vínculos. Relações seguras são construídas aos poucos e não precisam ser conquistadas por sofrimento.', cls: 'shard shard-three' },
  { text: '“não sou suficiente”', theme: 'A medida impossível', reflection: 'A autocrítica transforma falhas em identidade. Você pode aprender com o que aconteceu sem usar isso como prova de que vale menos.', cls: 'shard shard-four' },
  { text: '“sou só um erro”', theme: 'Culpa não é sentença', reflection: 'Reconhecer escolhas e repará-las é diferente de se condenar. A responsabilidade pode virar caminho quando vem acompanhada de cuidado.', cls: 'shard shard-five' },
]

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'))
    }, { threshold: 0.14 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTruth, setActiveTruth] = useState(0)
  const [activeAdvice, setActiveAdvice] = useState(0)
  const [activeFragment, setActiveFragment] = useState(0)
  const [showOverview, setShowOverview] = useState(true)
  const page = useRef<HTMLDivElement>(null)
  useReveal()

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      page.current?.style.setProperty('--mouse-x', `${event.clientX / window.innerWidth}`)
      page.current?.style.setProperty('--mouse-y', `${event.clientY / window.innerHeight}`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const truths = [
    ['A voz diz', '“Você precisa se diminuir para caber.”'],
    ['A realidade responde', 'Você não precisa desaparecer para merecer espaço.'],
    ['A voz diz', '“Se errou, não há volta.”'],
    ['A realidade responde', 'Um erro é um capítulo — nunca a história inteira.'],
  ]
  const advice = [
    {
      title: 'Quando a crítica vier',
      trigger: '“Eu estrago tudo.”',
      copy: 'Pare e troque a sentença por uma pergunta: “o que aconteceu, exatamente?” Fatos são mais gentis e mais úteis do que rótulos.',
    },
    {
      title: 'Quando a solidão apertar',
      trigger: '“Não tenho ninguém.”',
      copy: 'Não tente resolver a vida inteira de uma vez. Escolha um contato seguro, uma mensagem simples ou um lugar onde você se sinta um pouco menos sozinha.',
    },
    {
      title: 'Quando tudo parecer urgente',
      trigger: '“Preciso agir agora.”',
      copy: 'Adie decisões importantes por uma noite. Água, comida, banho, sono e uma conversa podem mudar o tamanho que uma dor parece ter.',
    },
    {
      title: 'Quando vier a comparação',
      trigger: '“Todo mundo está melhor do que eu.”',
      copy: 'A vida de alguém vista de fora nunca mostra o quadro inteiro. Volte para o que é possível hoje: um passo seu ainda é um passo válido.',
    },
    {
      title: 'Quando surgir culpa demais',
      trigger: '“Eu não mereço cuidado.”',
      copy: 'Responsabilizar-se pode ajudar a reparar; punir-se sem fim não. Você pode reconhecer um erro e, ainda assim, escolher se tratar com dignidade.',
    },
  ]

  return <div className="site" ref={page}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="topbar">
      <button className="brand" onClick={() => scrollTo('inicio')} aria-label="Voltar ao início">entre <i /> luz</button>
      <button className="menu-toggle" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fechar' : 'Menu'}</button>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Navegação principal">
        <button onClick={() => scrollTo('voz')}>A voz</button>
        <button onClick={() => scrollTo('espelhos')}>Espelhos</button>
        <button onClick={() => scrollTo('reconstrucao')}>Reconstrução</button>
      </nav>
    </header>

    <main id="conteudo">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-glow" />
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">uma travessia visual</p>
          <h1 id="hero-title">O que te feriu<br /><em>não é quem você é.</em></h1>
          <p className="lead">Existe uma distância entre as palavras que machucam e a verdade que permanece.</p>
          <button className="text-link" onClick={() => scrollTo('voz')}>começar a atravessar <span>↓</span></button>
        </div>
        <div className="hero-portrait" aria-label="Personagem em um quarto escuro, entre espelhos quebrados e uma porta iluminada">
          <img src="/images/hero-reconstrucao.png" alt="Mulher sentada em um quarto entre espelhos quebrados, com uma porta aberta iluminando uma planta" />
          <div className="portrait-vignette" />
          <div className="mirror-line line-a" /><div className="mirror-line line-b" /><div className="mirror-line line-c" />
        </div>
        <p className="hero-note">role para escutar o que ficou em silêncio</p>
      </section>

      <section className="voice section" id="voz" aria-labelledby="voice-title">
        <div className="section-number" data-reveal>01</div>
        <div className="voice-copy" data-reveal>
          <p className="eyebrow">um intervalo para você</p>
          <h2 id="voice-title">Conselhos para<br />quando a voz<br /><em>fala alto demais.</em></h2>
          <p>As frases difíceis não precisam conduzir seus próximos passos. Escolha uma delas e leia no seu ritmo.</p>
        </div>
        <aside className="advice-card" data-reveal aria-live="polite" aria-label="Conselhos de acolhimento">
          <div className="advice-tabs" role="tablist" aria-label="Escolha um conselho">
            {advice.map((item, index) => <button key={item.title} role="tab" aria-selected={activeAdvice === index} className={activeAdvice === index ? 'active' : ''} onClick={() => setActiveAdvice(index)}>{String(index + 1).padStart(2, '0')}</button>)}
          </div>
          <div className="advice-content">
            <span>{advice[activeAdvice].title}</span>
            <blockquote>{advice[activeAdvice].trigger}</blockquote>
            <p>{advice[activeAdvice].copy}</p>
          </div>
          <i>✦</i>
        </aside>
        <p className="support-note" data-reveal>Se a dor ficar grande demais ou surgir vontade de se machucar, procure alguém de confiança ou o CVV: <a href="tel:188">188</a>.</p>
      </section>

      <section className="mirrors section" id="espelhos" aria-labelledby="mirrors-title">
        <div className="mirrors-heading" data-reveal>
          <p className="eyebrow">fragmentos</p>
          <h2 id="mirrors-title">Nem todo reflexo<br />merece ser <em>acreditado.</em></h2>
        </div>
        <div className="shard-field" aria-label="Frases críticas fragmentadas">
          {shards.map((shard, index) => <article className={`${shard.cls}${!showOverview && activeFragment === index ? ' selected' : ''}`} key={shard.text} data-reveal tabIndex={0} role="button" aria-pressed={!showOverview && activeFragment === index} onClick={() => { setActiveFragment(index); setShowOverview(false) }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { setActiveFragment(index); setShowOverview(false) } }}><span>{shard.text}</span></article>)}
          <div className={`shard-core${showOverview ? ' selected' : ''}`} data-reveal tabIndex={0} role="button" aria-label="Imagem de uma mulher cercada por frases difíceis" aria-pressed={showOverview} onClick={() => setShowOverview(true)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setShowOverview(true) }}><span>𝓷𝓪̃𝓸 𝓼𝓸𝓾 𝓮𝓼𝓼𝓪𝓼 𝓹𝓪𝓵𝓪𝓿𝓻𝓪𝓼</span></div>
        </div>
        <aside className="fragment-detail" aria-live="polite">
          {showOverview ? <>
            <p>por trás dos fragmentos</p>
            <h3>Essas frases machucam. Não definem.</h3>
            <span>O texto atravessa dores profundas de rejeição, solidão, culpa e comparação, revelando a sensação constante de nunca ser suficiente. Mais do que um relato de sofrimento, ele retrata alguém tentando sobreviver ao peso da própria autocrítica, enquanto luta para não se perder dentro dela. Essas dores contam parte de uma história, mas não definem quem essa pessoa é, muito menos determinam o seu valor.</span>
            <small>toque em um espelho para explorar um tema</small>
          </> : <>
            <p>fragmento {String(activeFragment + 1).padStart(2, '0')} de {String(shards.length).padStart(2, '0')}</p>
            <h3>{shards[activeFragment].theme}</h3>
            <span>{shards[activeFragment].reflection}</span>
            <small>toque em outro espelho ou volte à visão geral</small>
          </>}
        </aside>
      </section>

      <section className="reality section" aria-labelledby="reality-title">
        <div className="section-number" data-reveal>02</div>
        <div data-reveal>
          <p className="eyebrow">dor ≠ destino</p>
          <h2 id="reality-title">A dor conta<br />uma versão.<br /><em>Não a versão inteira.</em></h2>
        </div>
        <div className="truth-switcher" data-reveal>
          {truths.map(([label, copy], index) => <button key={copy} className={activeTruth === index ? 'truth active' : 'truth'} onClick={() => setActiveTruth(index)}>
            <small>{label}</small><span>{copy}</span>
          </button>)}
        </div>
      </section>

      <section className="rebuild section" id="reconstrucao" aria-labelledby="rebuild-title">
        <div className="door-light" /><div className="plant" aria-hidden="true"><b /><i /><i /><i /></div>
        <div className="rebuild-copy" data-reveal>
          <p className="eyebrow">reconstrução</p>
          <h2 id="rebuild-title">A saída não apaga<br />o caminho.<br /><em>Ela abre outro.</em></h2>
          <p>Reconstruir não exige pressa, perfeição ou uma nova versão de si. Pode começar pequeno: uma pausa, um limite, uma conversa segura, um dia de cada vez.</p>
        </div>
        <div className="steps" data-reveal>
          <div><b>01</b><span>Respirar antes de acreditar.</span></div>
          <div><b>02</b><span>Escolher falar consigo com cuidado.</span></div>
          <div><b>03</b><span>Permitir que o apoio encontre você.</span></div>
        </div>
      </section>

      <section className="closing" aria-labelledby="closing-title">
        <div data-reveal>
          <p className="eyebrow">continua</p>
          <h2 id="closing-title">Ainda há luz<br />do outro lado<br /><em>da porta.</em></h2>
          <p>Você não precisa atravessar tudo sozinha.</p>
          <button className="text-link light" onClick={() => scrollTo('inicio')}>voltar ao começo <span>↑</span></button>
        </div>
      </section>
    </main>
    <footer><span>Uma experiência de escuta e recomeço.</span><span>Feita para ser percorrida no seu tempo.</span></footer>
  </div>
}

createRoot(document.getElementById('root')!).render(<App />)
