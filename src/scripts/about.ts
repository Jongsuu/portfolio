import $ from "jquery";
import { Modal } from "bootstrap";

$(() => {
    let modal = new Modal(document.querySelector("#downloadResume"));

    // Close modal after click on download link
    document.querySelector("#downloadResume").querySelector(".modal-footer").querySelectorAll("a").forEach(item => {
        item.addEventListener("click", () => {
            modal.hide();
        });
    })
});
