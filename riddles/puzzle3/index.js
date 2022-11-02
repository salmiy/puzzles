const encrypt = CryptoJS.AES.encrypt
const decrypt = CryptoJS.AES.decrypt

const enc_key = "U2FsdGVkX1+QLn8Qj5Y4adzR1R+VFLoQFm77dSj3GbOLZt+MylxKpODlilZEXjs88/TG4Kly0A0p0Hd6ABCY7g=="
let key


const guarding_page = `
<div id="guard">
<div id="err">Something is wrong about your solution</div>
<div id="pass"></div>
<div id="input">
    <label id="answer-label" for="answer">The passphrase from the previous puzzle</label>
    <input id="answer" type="text" placeholder="Example: fine if you don't know" />
</div>
</div>
`
let riddle 
const enc_riddle = `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`


let mtimeout

const showGuardingPage = () => {
    clearTimeout(mtimeout)
    document.body.innerHTML = guarding_page
    let answer = document.getElementById("answer");
    let guard = document.getElementById("guard");
    let err = document.getElementById("err")
    answer.onkeydown = e => {
        if (e.key == "Enter")
        {
            key = decrypt(enc_key, e.target.value.toLowerCase()).toString(CryptoJS.enc.Utf8);
            if (key.startsWith("key-"))
                showRiddle();
            else {
                err.style.display = "flex"
                setTimeout(() => {
                    err.style.display = "none"
                }, 3000);
            }
        }
    }
}

const givePassPhrase = s => {
    showGuardingPage()
    const pass = document.getElementById("pass")
    pass.innerHTML = `<div>Your passphrase</div><b>${s}</b>`
    pass.style.display = "flex"
    setTimeout(() => {
        pass.style.display = "none"
    }, 15000);
}

const showRiddle = () => {
    riddle = decrypt(enc_riddle, key).toString(CryptoJS.enc.Utf8)
    document.body.innerHTML =  riddle
    const close = document.getElementById("close")
    const answerIn = document.getElementById("answer-input")

    let pass;
    const enc_pass = "U2FsdGVkX1/SKyftBJ8pb3nWfA9S3HHdZELH+IUvn5UHNqWOS50jx15fxmAo1oPq="

    answerIn.onkeydown = e => {
        if (e.key == "Enter")
        {
            pass = decrypt(enc_pass, e.target.value.toLowerCase()).toString(CryptoJS.enc.Utf8);
            if (pass.startsWith('f'))
                givePassPhrase(pass);
            else 
                givePassPhrase("pass phrase 3031")
        }
    }

    close.onclick = e => {
        showGuardingPage()
    }
    mtimeout = setTimeout(() => {
        showGuardingPage()
    }, 420000);
}

showGuardingPage();