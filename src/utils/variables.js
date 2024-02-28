export const twoTone = "TWO_TONE";
export const threeTone = "THREE_TONE";
export const twoToneGradientType = 2;
export const threeToneGradientType = 3;
export const google_client_id =
  "26563413783-snc23qd1k4qne0op59r8ledbgsjr1c3e.apps.googleusercontent.com";

export const twoToneGradientCopyCode = (color) => {
  return `background: ${color[0]}; /* fallback for old browsers */ 
    background: -webkit-linear-gradient(to right, ${color[0]}, ${color[1]}); /* Chrome 10-25, Safari 5.1-6 */ 
    background: linear-gradient(to right, ${color[0]}, ${color[1]}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */`;
};

export const threeToneGradientCopyCode = (color) => {
  return `background: ${color[0]};  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, ${color[0]}, ${color[1]}, ${color[2]});  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, ${color[0]}, ${color[1]}, ${color[2]}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `;
};
