export const capitalizeFLetter = (value) => {
    let string = value;
    return (value = string[0].toUpperCase() + string.slice(1));
  };