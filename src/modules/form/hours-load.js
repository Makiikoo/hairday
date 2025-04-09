import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "../form/hours-click.js"

const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules }) {
  // Limpa os horários anteriores
  hours.innerHTML = "" 

  // Obtem a lista de horários ocupados
  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm")
)

  const opening = openingHours.map((hour) => {

    const [scheduleHour] = hour.split(":")

    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())

    const available = !unavailableHours.includes(hour) && !isHourPast

    return {
      hour,
      available
    }
  })

  // Controla se os headers já foram adicionados
  const addedHeaders = {
    morning: false,
    afternoon: false,
    evening: false,
  };

  opening.forEach(({ hour, available }) => {
    if (hour === "9:00" && !addedHeaders.morning) {
      hourHeaderAdd("Manhã");
      addedHeaders.morning = true;
    } else if (hour === "13:00" && !addedHeaders.afternoon) {
      hourHeaderAdd("Tarde");
      addedHeaders.afternoon = true;
    } else if (hour === "18:00" && !addedHeaders.evening) {
      hourHeaderAdd("Noite");
      addedHeaders.evening = true;
    }

    const li = document.createElement("li");
    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");
    li.textContent = hour;

    hours.append(li);
  })
  // Adiciona o evento de click nos horários disponiveis.
  hoursClick()
}

function hourHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;
  hours.append(header);
}
