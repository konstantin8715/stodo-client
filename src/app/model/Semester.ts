import { Subject } from "./Subject";

export interface Semester {
  id: number;
  title: string;
  createdAt: string;
  subjects?: Subject[];

  // constructor(public id: number, public title: string, public createdAt: string) {
  //   this.id = id;
  //   this.title = title;
  //   this.createdAt = createdAt;
  // }
}

