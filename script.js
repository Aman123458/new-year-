// Shared interactions: confetti generator + countdown
(function(){
  function rand(a,b){return Math.random()*(b-a)+a}

  // Confetti: create many small colored divs and animate them with CSS transforms
  function startConfetti(){
    const colors=['#ff6b81','#ffd166','#6be7ff','#b28bff','#ff9db4']
    const count=40
    for(let i=0;i<count;i++){
      const el=document.createElement('div')
      el.className='confetti'
      el.style.left=rand(0,100)+'%'
      el.style.background=colors[Math.floor(rand(0,colors.length))]
      el.style.width=rand(6,10)+'px'
      el.style.height=rand(8,14)+'px'
      el.style.transform='translateY(-10vh) rotate('+rand(0,360)+'deg)'
      el.style.opacity=1
      el.style.transition='transform 3s linear, top 3s linear, opacity 1.2s ease'
      document.body.appendChild(el)
      // trigger fall
      setTimeout(()=>{
        const x=rand(-25,25)
        const y=rand(90,140)
        el.style.transform='translate('+x+'vw,'+y+'vh) rotate('+rand(180,720)+'deg)'
        el.style.opacity=0
      }, rand(50,400))
      // cleanup
      setTimeout(()=>el.remove(), 4200)
    }
  }

  // Countdown to 2026-01-01 local time
  function initCountdown(){
    const el=document.getElementById('countdown')
    if(!el) return
    function update(){
      const now=new Date()
      const target=new Date(now.getFullYear()>=2026? '2026-01-01T00:00:00' : '2026-01-01T00:00:00')
      const diff=target - now
      if(diff<=0){
        el.textContent='HAPPY 2026! 🎉'
        startConfetti()
        return
      }
      const s=Math.floor(diff/1000)%60
      const m=Math.floor(diff/60000)%60
      const h=Math.floor(diff/3600000)%24
      const d=Math.floor(diff/86400000)
      el.textContent = `${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`
    }
    update(); setInterval(update,500)
  }

  // Start small confetti on pages with .center
  document.addEventListener('DOMContentLoaded',()=>{
    try{ if(document.querySelector('.center')) startConfetti() }catch(e){}
    initCountdown()
  })

  // Expose for consoles/tests
  window._NY_startConfetti = startConfetti
})();
