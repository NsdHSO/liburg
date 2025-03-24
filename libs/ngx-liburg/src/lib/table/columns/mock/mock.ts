import { of } from "rxjs";

export function overlay() {
  return{
    create: () => {
      return {
        attach: () => {
        },
        backdropClick: of('test')
      }
    },
    position: () => {
      return {
        flexibleConnectedTo: () => {
          return {
            withPositions: () => {
            }
          }
        }
      }
    },
  }
}
