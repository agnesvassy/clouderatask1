//Defining classes needed to store Issue details
export class User {
      id: string;
      login: string;
}

export class Label {
      id: string;
      name: string;
      color: string;
}

export class Item {
      id: string;
      number: string;
      title: string;
      state: string;
      user: User;
      labels: Label[];
}

export class Issue {
    total_count: number;
    items: Item[];
}
