import { Meta, Story } from "@storybook/react";
// import CarSearchTypeButton from "../components/CarService/CarSearchTypeButton";
import { decorators } from "../../.storybook/preview";
import { action } from "@storybook/addon-actions";
import { IButtonProps } from "../types/type";

export default {
  title: "버튼",
  // component: CarSearchTypeButton,
  decorators,
  // argTypes: { onClick: { action: "clicked" } },
} as Meta;

// const Template = (args) => <CarSearchTypeButton {...args} />;
// export const Basic: Story<IButtonProps> = Template.bind({});
// export const Primary: Story<IButtonProps> = Template.bind({});

// Basic.args = {
//   label: "Click 📝",
// };

// Primary.args = {
//   label: "Press 📝",
// };
