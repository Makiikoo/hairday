import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"
const periods = document.querySelectorAll(".period")


// Gera evento de click para cada lista( manhã, tarde e noite)
periods.forEach((periods) =>{
  // Captura o evento de click da lista.
  periods.addEventListener("click", async(event) => {
    if(event.target.classList.contains("cancel-icon")){
      // Obtém a li pai do elemento clicado.
      const item = event.target.closest("li")

      // PEga o id do agendamento para remover.
      const { id } = item.dataset

      // Confirma que o ID foi selecionado
      if(id){
        // Confirma se o usuário quer cancelar.
        const isConfirm = confirm("tem certeza que deseja cancelar o agendamento?")
        if (isConfirm){
          // Faz a requisição na API para cancelar.
          await scheduleCancel({ id })

          // Recarrega os agendamentos.
          schedulesDay()
        }
      }
    }
  })

})