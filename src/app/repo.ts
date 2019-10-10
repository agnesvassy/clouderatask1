//Defining classes needed to store Repo details
export class Owner {
      id: string;
      login: string;
}

export class Item {
      id: string;
      name: string;
      full_name: string;
      url: string;
      description: string;
      forks_count: string;
      stargazers_count: string;
      open_issues_count: string;
      owner: Owner;
}

export class Repo {
    total_count: number;
    items: Item[];
}
