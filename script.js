const squareboard = document.getElementById('squareboard')

const createhoverboxes = (x) => {
  const boxes = []
  if (x > 0) {
    for (let i = 0; i < x; i++) {
      const box = document.createElement('span')
      box.classList.add('hoverbox')
      box.addEventListener('mouseenter', (e) => {
        e.target.style.setProperty('animation', 'dimm 700ms linear none')
        setTimeout(() => {
          e.target.style.animation = ''
        }, 700)
      })
      boxes.push(box)
    }
  }
  return boxes
}

const numOfBoxes = (w, h) => {
  if (w > 768) {
    return Math.floor((h / 70) + 1) * Math.floor(w / 70)
  }
  return Math.floor((h / 50) + 1) * Math.floor(w / 50)
}


const w = document.getElementById('squareboard').getBoundingClientRect().width
const h = document.getElementById('squareboard').getBoundingClientRect().height
const hoverboxes = createhoverboxes(numOfBoxes(w, h))
for (let i = 0; i < hoverboxes.length; i++) {
  squareboard.appendChild(hoverboxes[i])
}

window.addEventListener('resize', () => {
  const w = document.getElementById('squareboard').getBoundingClientRect().width
  const h = document.getElementById('squareboard').getBoundingClientRect().height
  const hoverboxes = createhoverboxes(numOfBoxes(w, h))
  squareboard.innerHTML = ''
  for (let i = 0; i < hoverboxes.length; i++) {
    squareboard.appendChild(hoverboxes[i])
  }
  console.log(numOfBoxes(w, h));
})

setInterval(() => {
  const boxes = document.getElementsByClassName('hoverbox')
  const x = Math.floor(Math.random() * boxes.length)
  boxes[x].style.setProperty('animation', 'dimm 1500ms linear none')
  setTimeout(() => {
    boxes[x].style.animation = ''
  }, 1500)

}, 2400);
setInterval(() => {
  const boxes = document.getElementsByClassName('hoverbox')
  const x = Math.floor(Math.random() * boxes.length)
  boxes[x].style.setProperty('animation', 'dimm 1500ms linear none')
  setTimeout(() => {
    boxes[x].style.animation = ''
  }, 1500)

}, 4600);

setInterval(() => {
  const boxes = document.getElementsByClassName('hoverbox')
  const x = Math.floor(Math.random() * boxes.length)
  boxes[x].style.setProperty('animation', 'dimm 1500ms linear none')
  setTimeout(() => {
    boxes[x].style.animation = ''
  }, 1500)

}, 3100);




const RandonChars = (x) => {
  const chars = 'aefhijlnorstuvxz123450#$*'
  let word = ''
  for (let i = 0; i < x; i++) {
    word += chars[Math.floor(Math.random() * (chars.length))]
  }
  return word
}

const text = document.getElementById('rollingtext')
const texts = ['Web Developer', 'Frontend Developer', 'Software Engineer']
let i = 0;
let flipsNum = 4

setInterval(() => {
  i = (i + 1) % texts.length
  let s = texts[i]
  let words = []
  for (let j = 0; j < flipsNum; j++) {
    words.push(s.split(' ').map(el => {
      return RandonChars(el.length)
    }).join(' '))
  }
  words.push(s)
  for (let j = 0; j < words.length; j++) {
    setTimeout(() => {
      text.innerHTML = words[j]
    }, 120 * j)
  }
}, 4000);


let sections = document.querySelectorAll('.section')
let navlinks = document.querySelectorAll('nav a')

window.onscroll = () => {
  let top = window.scrollY;
  sections.forEach(el => {
    let offset = el.offsetTop
    let height = el.offsetHeight
    let id = el.getAttribute('id')
    if (top + 56 >= offset && top + 56 < (offset + height)) {
      navlinks.forEach(el => {
        el.classList.remove('text-primary', 'text-white')
        el.classList.add('text-white')
        if (id === 'home' && el.getAttribute('href') === '#') {
          el.classList.remove('text-white')
          el.classList.add('text-primary')
        } else {
          if (el.getAttribute('href') === `#${id}`)
            el.classList.remove('text-white')
          el.classList.add('text-primary')
        }
      })
    }
  })
}








// email
const form = document.getElementById('submitForm')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')

const nameAlert = document.getElementById('nameAlert')
const emailAlert = document.getElementById('emailAlert')
const messageAlert = document.getElementById('messageAlert')
const submitButton = form.querySelector('button')
const submitButtonText = form.querySelector('button>span')

let formStatus = 'NEW'

function updateFormStatus(s) {
  if (s === 'SENDING') {
    formStatus = s
    submitButtonText.innerHTML = 'sending'
  } else if (s === 'SENT') {
    formStatus = s
    submitButton.classList.remove('bg-primary','bg-opacity-50')
    submitButton.classList.add('bg-green-500')
    submitButtonText.innerHTML = 'sent'
  }else if(s==='RETRY'){
    formStatus = s
    submitButton.classList.remove('bg-primary','bg-opacity-50')
    submitButton.classList.add('bg-yellow-500')
    submitButtonText.innerHTML = '! retry'
  }
}

const sendMail = async () => {
  if (formStatus === 'SENDING' || formStatus === 'SENT') {
    return
  }

  let name = nameInput.value
  let email = emailInput.value
  let message = messageInput.value
  // console.log(name + email + message);
  nameAlert.classList.add('hidden')
  emailAlert.classList.add('hidden')
  messageAlert.classList.add('hidden')

  if (!name.trim()) {
    nameAlert.classList.remove('hidden')
    return
  }
  if (!email.trim()) {
    emailAlert.classList.remove('hidden')
    return
  }
  if (!message.trim()) {
    messageAlert.classList.remove('hidden')
    return
  }


    updateFormStatus('SENDING')   
    const res = await Email.send({
      SecureToken: "6e24c9b9-1a71-4864-8bbb-c67bb43dff4b",
      To: 'osama.aboajeb333@gmail.com',
      From: "osama.aboajeb333@gmail.com",
      Subject: "Protfolio Message",
      Body: `From: ${name} <br> Email: ${email} <br> Message: ${message} `
    })
    console.log(res);
    if(res === 'OK'){
      updateFormStatus('SENT')
    }else{
      updateFormStatus('RETRY')
    }

}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMail()
})



// 6e24c9b9-1a71-4864-8bbb-c67bb43dff4b