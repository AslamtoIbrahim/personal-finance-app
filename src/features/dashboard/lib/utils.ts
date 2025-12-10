import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number) {
  const sign = value < 0 ? "-" : "";
  const amount = Math.abs(value).toFixed(2);
  return `${sign}$${amount}`;
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


export function animate(isActive: boolean){ 
  const anime = isActive ? 'opacity-100 scale-100 visible' :  'opacity-0 scale-75 invisible'
  return cn("transition-all duration-300 ease-in-out", anime)
}

function getSuffix(day: number) {
  switch (day) {
    case 1:
    case 21:
    case 31:
      return "st";
    case 2:
    case 22:
      return "nd";
    case 3:
    case 23:
      return "rd";
    default:
      return "th";
  }
}

export function getFnsDate(date: string){
  const dt = new Date(date)
  const day = dt.getUTCDate()
  const suf = getSuffix(day)
  return `Monthly-${day}${suf}`
};

