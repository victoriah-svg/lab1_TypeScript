"use strict";

interface courses {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

const form = document.querySelector<HTMLInputElement>("form")!;

form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    console.log("Du klickade");
});