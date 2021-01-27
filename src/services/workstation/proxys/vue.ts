import {WorkstationCreatorBase} from "./_base";
import {exec} from "../../../utils/_exec";

export class VueWorkstationCreator extends WorkstationCreatorBase {
  create(): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(`vue create ${this.name}`);
    });
  }
}
