import { Constructor } from "../types";

type ClassDecorator<T> = (target: T) => void;

export function Injectable<T>(): ClassDecorator<Constructor<T>> {
  return (target: Constructor<any>) => {};
}
