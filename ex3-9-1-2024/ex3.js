import { error } from "console";
import { createRequire } from "module";
import { resolve } from "path";
const require = createRequire(import.meta.url);
const fs=require('fs');
const readline=require('readline').createInterface({
    input:process.stdin,
    output:process.stdout
});

const caricaFile = (nomeFile) => {
    return new Promise((resolve,reject)=>{
        let words;
        fs.readFile(nomeFile, (error,data)=>{
            if(error){
                throw error;
            }
            words = data.toString().split("\n");
            resolve(words);
        });
    });
};

function trovaRime(parolaIns, parole){
    const arrayRime=[];
    parole.forEach((element,i) => {
        let j = 1;
        let checkWord = true;
        let syllabeBreakElement = syllabeBreaker(element);
        let syllabeBreakWord = syllabeBreaker(parolaIns);
        while (checkWord && j<=syllabeBreakElement) {
            if(parolaIns.charAt(parolaIns.length-j)!==element.charAt(element.length-j) || syllabeBreakElement!==syllabeBreakWord){
                checkWord = false;
            }
            j++;
        }
        if(checkWord){
            arrayRime.push(element);
        }
    });
    return arrayRime;
}

function isVowel(char){
    let check=false;
    const vowels=['a','e','i','o','u'];
    for (let index = 0; index < vowels.length; index++) {
        if(char==vowels[index]){
            check=true;
        }        
    }
    return check;
}

function syllabeBreaker(parola){
    let i=1;
    let currentLetter;
    let nextLetter;
    let checkVowel = false;
    let syllabeBreak = false;
    while(!syllabeBreak){
        currentLetter = parola.charAt(parola.length-i);
        if(i<=parola.length){
            nextLetter = parola.charAt(parola.length-1-i);
        }else{
            nextLetter = null;
        }
        if(isVowel(currentLetter)){
            checkVowel = true;
        }
        if(nextLetter==currentLetter || (isVowel(nextLetter) && checkVowel) || nextLetter==null){
            syllabeBreak = true;
        }
        i++;
    }
    return i;
}

readline.question('Inserire parola: ', (parola) => {
    caricaFile("660000_parole_italiane.txt").then((array)=>{
        readline.close();
        let rime=trovaRime(parola, array);
        console.log(rime.length+" parole rimano con "+parola);
        for (let index = 0; index < rime.length; index++) {
            console.log(index+1+". "+rime[index]);
        }
    })
})