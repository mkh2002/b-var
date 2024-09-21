interface Props extends React.SVGAttributes<SVGElement> {}
export const LogoIcon = ({ ...props }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={42}
      height={42}
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M22,13h-6V5c0-1.105,0.895-2,2-2h2c1.105,0,2,0.895,2,2V13z"
        opacity=".35"
      ></path>
      <path d="M16,13h6v6c0,1.105-0.895,2-2,2h-2c-1.105,0-2-0.895-2-2V13z"></path>
      <path
        d="M15,16H9v-6c0-1.105,0.895-2,2-2h2c1.105,0,2,0.895,2,2V16z"
        opacity=".35"
      ></path>
      <path d="M9,16h6v3c0,1.105-0.895,2-2,2h-2c-1.105,0-2-0.895-2-2V16z"></path>
      <path
        d="M8,12H2V7c0-1.105,0.895-2,2-2h2c1.105,0,2,0.895,2,2V12z"
        opacity=".35"
      ></path>
      <path
        d="M2,12h6v7c0,1.105-0.895,2-2,2H4c-1.105,0-2-0.895-2-2V12z"
        opacity={0.7}
      ></path>
    </svg>
  );
};
