const encrypt = CryptoJS.AES.encrypt
const decrypt = CryptoJS.AES.decrypt

const guarding_page = `
        <div id="guard">
            <div id="input">
                <label id="answer-label" for="answer">Your answer for puzzle 1</label>
                <input id="answer" type="text" placeholder="Example: fine if you don't know" />
            </div>
        </div>
`
const riddle = `
        <div id="riddle">
        <button id="close">Close</button>
            <div id="wrapper">
                <div id="title">Compression code</div>
                <div id="riddle-body">
                    This will be the riddle body
                </div>
                <div id="riddle-answer">
                    <label for="riddle-answer" id="riddle-answer-label">Use this input to help you solve the puzzle</label>
                    <input type="text" id="riddle-answer">
                </div>
                <div id="grid">
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element black"></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    <div class="element"><input type="text" maxlength="1" value="e" /><span>11</span></div>
                    
                    
                </div>
            </div>
        </div>
`

const encrypted = encrypt(riddle, "key")
console.log(encrypted.toString())
console.log(decrypt(encrypted, "key").toString(CryptoJS.enc.Utf8))

let mtimeout

const showGuardingPage = () => {
    clearTimeout(mtimeout)
    let answer = document.getElementById("answer");
    let guard = document.getElementById("guard");
    answer.onkeydown = e => {
        if (e.key == "Enter")
        {
            showRiddle();
        }
    }
}

const showRiddle = () => {
    document.body.innerHTML = riddle
    const close = document.getElementById("close")
    close.onclick = e => {
        document.body.innerHTML = guarding_page
        showGuardingPage()
    }
    mtimeout = setTimeout(() => {
        document.body.innerHTML = guarding_page
        showGuardingPage()
    }, 5000);
}

showGuardingPage();