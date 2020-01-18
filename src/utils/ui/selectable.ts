// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toChoices(choices: Selectable[]): any[] {
  return choices.map((choice) => choice.toChoice());
}

export { toChoices };

export default interface Selectable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toChoice(): any;
}
