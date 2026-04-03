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

form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    console.log("Du klickade");
    console.log(codeInput.value, nameInput.value, progInput.value, linkInput.value);
    
});