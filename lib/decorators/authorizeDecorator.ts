import { MetadataKeys } from "../enums/metadataKeys";

const Authorize = (policies: string[]): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.POLICIES, policies, target);
  };
};

export default Authorize;
