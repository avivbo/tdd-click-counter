import App from "./App";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

// Set up enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

/**
 *
 * @param {ShallowWrapper} wrapper
 * @param {String} val
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

test("renders without errors", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("should render button", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "increment-button");
  expect(appComponent.length).toBe(1);
});

test("should render counter display", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "counter-display");
  expect(appComponent.length).toBe(1);
});

test("should counter starts at 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test("should clicking on button increments counter display", () => {
  const wrapper = setup();

  // find the button
  const button = findByTestAttr(wrapper, "increment-button");

  // click the button
  button.simulate("click");

  // find the display, and test the number that be incremented
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});
