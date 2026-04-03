"use strict";

interface courses {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}


// Formulär 
const form = document.querySelector<HTMLInputElement>("form")!;
//Kurkod input
const codeInput = document.getElementById("courseCode") as HTMLInputElement;
//Kursnamn input
const nameInput = document.getElementById("courseName") as HTMLInputElement;
//Progression input
const progInput = document.getElementById("progression") as HTMLInputElement;
//Syllabus Input
const linkInput = document.getElementById("syllabus") as HTMLInputElement;

//Händelselyssnare på klick på sumbit formulär
form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    console.log("Du klickade");

//lägg till validering för ifyllnad och generera felmeddelanden om ngt saknas
    

//Ett objekt för ifylld kurs
const newCourse: courses = {
    code: codeInput.value,
    name: nameInput.value,
    progression: progInput.value,
    syllabus: linkInput.value,
}
console.log(newCourse);
    
});