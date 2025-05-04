import { 
  Name, InsertName, Title, InsertTitle, User, InsertUser,
  names, titles, users
} from "@shared/schema";

// Modify the interface with CRUD methods needed
export interface IStorage {
  // User methods (kept from original file)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Name methods
  getNames(type?: string, gender?: string, ethnicity?: string): Promise<Name[]>;
  getName(id: number): Promise<Name | undefined>;
  createName(name: InsertName): Promise<Name>;
  
  // Title methods
  getTitles(gender?: string, ethnicity?: string): Promise<Title[]>;
  getTitle(id: number): Promise<Title | undefined>;
  createTitle(title: InsertTitle): Promise<Title>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private names: Map<number, Name>;
  private titles: Map<number, Title>;
  private userCurrentId: number;
  private nameCurrentId: number;
  private titleCurrentId: number;

  constructor() {
    this.users = new Map();
    this.names = new Map();
    this.titles = new Map();
    this.userCurrentId = 1;
    this.nameCurrentId = 1;
    this.titleCurrentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }
  
  // User methods (kept from original file)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Name methods
  async getNames(type?: string, gender?: string, ethnicity?: string): Promise<Name[]> {
    let filteredNames = Array.from(this.names.values());
    
    if (type) {
      filteredNames = filteredNames.filter(name => name.type === type);
    }
    
    if (gender && gender !== 'any') {
      filteredNames = filteredNames.filter(name => 
        name.gender === gender || name.gender === 'neutral'
      );
    }
    
    if (ethnicity && ethnicity !== 'any') {
      filteredNames = filteredNames.filter(name => 
        name.ethnicity === ethnicity || !name.ethnicity
      );
    }
    
    return filteredNames;
  }
  
  async getName(id: number): Promise<Name | undefined> {
    return this.names.get(id);
  }
  
  async createName(insertName: InsertName): Promise<Name> {
    const id = this.nameCurrentId++;
    const name: Name = { ...insertName, id };
    this.names.set(id, name);
    return name;
  }
  
  // Title methods
  async getTitles(gender?: string, ethnicity?: string): Promise<Title[]> {
    let filteredTitles = Array.from(this.titles.values());
    
    if (gender && gender !== 'any') {
      filteredTitles = filteredTitles.filter(title => 
        title.gender === gender || title.gender === 'neutral'
      );
    }
    
    if (ethnicity && ethnicity !== 'any') {
      filteredTitles = filteredTitles.filter(title => 
        title.ethnicity === ethnicity || !title.ethnicity
      );
    }
    
    return filteredTitles;
  }
  
  async getTitle(id: number): Promise<Title | undefined> {
    return this.titles.get(id);
  }
  
  async createTitle(insertTitle: InsertTitle): Promise<Title> {
    const id = this.titleCurrentId++;
    const title: Title = { ...insertTitle, id };
    this.titles.set(id, title);
    return title;
  }
  
  // Initialize with sample data
  private initializeData() {
    // Nigerian titles
    const initialTitles: InsertTitle[] = [
      { title: "Chief", gender: "male", ethnicity: undefined },
      { title: "Aunty", gender: "female", ethnicity: undefined },
      { title: "Uncle", gender: "male", ethnicity: undefined },
      { title: "Ma", gender: "female", ethnicity: undefined },
      { title: "Odogwu", gender: "male", ethnicity: "igbo" },
      { title: "Oga", gender: "male", ethnicity: undefined },
      { title: "Alhaji", gender: "male", ethnicity: "hausa" },
      { title: "Alhaja", gender: "female", ethnicity: "hausa" },
      { title: "Madam", gender: "female", ethnicity: undefined },
      { title: "Nne", gender: "female", ethnicity: "igbo" }
    ];
    
    // Nigerian first names
    const initialFirstNames: InsertName[] = [
      { name: "Oluwaseun", type: "firstName", gender: "neutral", ethnicity: "yoruba", meaning: "God has done this for me" },
      { name: "Chioma", type: "firstName", gender: "female", ethnicity: "igbo", meaning: "Good God" },
      { name: "Adebayo", type: "firstName", gender: "male", ethnicity: "yoruba", meaning: "The crown meets joy" },
      { name: "Ngozi", type: "firstName", gender: "female", ethnicity: "igbo", meaning: "Blessing" },
      { name: "Emeka", type: "firstName", gender: "male", ethnicity: "igbo", meaning: "God has done well" },
      { name: "Folake", type: "firstName", gender: "female", ethnicity: "yoruba", meaning: "Use wealth to pamper this" },
      { name: "Onyeka", type: "firstName", gender: "neutral", ethnicity: "igbo", meaning: "Who is greater than God" },
      { name: "Tunde", type: "firstName", gender: "male", ethnicity: "yoruba", meaning: "The return of a loved one" },
      { name: "Amara", type: "firstName", gender: "female", ethnicity: "igbo", meaning: "Grace" },
      { name: "Obinna", type: "firstName", gender: "male", ethnicity: "igbo", meaning: "Father's heart" },
      { name: "Yewande", type: "firstName", gender: "female", ethnicity: "yoruba", meaning: "Mother has returned" },
      { name: "Chinedu", type: "firstName", gender: "male", ethnicity: "igbo", meaning: "God leads" },
      { name: "Funmilayo", type: "firstName", gender: "female", ethnicity: "yoruba", meaning: "Give me joy" },
      { name: "Olumide", type: "firstName", gender: "male", ethnicity: "yoruba", meaning: "God has come" },
      { name: "Nneka", type: "firstName", gender: "female", ethnicity: "igbo", meaning: "Mother is supreme" },
      { name: "Adewale", type: "firstName", gender: "male", ethnicity: "yoruba", meaning: "The crown has come home" },
      { name: "Zainab", type: "firstName", gender: "female", ethnicity: "hausa", meaning: "Fragrant flower" },
      { name: "Ikenna", type: "firstName", gender: "male", ethnicity: "igbo", meaning: "Father's strength" },
      { name: "Aisha", type: "firstName", gender: "female", ethnicity: "hausa", meaning: "Prosperous life" },
      { name: "Nnamdi", type: "firstName", gender: "male", ethnicity: "igbo", meaning: "My father is alive" },
      { name: "Chiamaka", type: "firstName", gender: "female", ethnicity: "igbo", meaning: "God is beautiful" },
      { name: "Ekundayo", type: "firstName", gender: "neutral", ethnicity: "yoruba", meaning: "Sorrow becomes joy" },
      { name: "Ebere", type: "firstName", gender: "female", ethnicity: "igbo", meaning: "Mercy" },
      { name: "Kehinde", type: "firstName", gender: "neutral", ethnicity: "yoruba", meaning: "The second-born of twins" }
    ];
    
    // Nigerian last names
    const initialLastNames: InsertName[] = [
      { name: "Okafor", type: "lastName", gender: "neutral", ethnicity: "igbo", meaning: undefined },
      { name: "Adeyemi", type: "lastName", gender: "neutral", ethnicity: "yoruba", meaning: undefined },
      { name: "Okonkwo", type: "lastName", gender: "neutral", ethnicity: "igbo", meaning: undefined },
      { name: "Eze", type: "lastName", gender: "neutral", ethnicity: "igbo", meaning: "King" },
      { name: "Adebisi", type: "lastName", gender: "neutral", ethnicity: "yoruba", meaning: undefined },
      { name: "Nwachukwu", type: "lastName", gender: "neutral", ethnicity: "igbo", meaning: "Child of God" },
      { name: "Olawale", type: "lastName", gender: "neutral", ethnicity: "yoruba", meaning: undefined },
      { name: "Uzoma", type: "lastName", gender: "neutral", ethnicity: "igbo", meaning: "Good road" },
      { name: "Obasanjo", type: "lastName", gender: "neutral", ethnicity: "yoruba", meaning: undefined },
      { name: "Igwe", type: "lastName", gender: "neutral", ethnicity: "igbo", meaning: "Highness" },
      { name: "Afolayan", type: "lastName", gender: "neutral", ethnicity: "yoruba", meaning: undefined },
      { name: "Nwosu", type: "lastName", gender: "neutral", ethnicity: "igbo", meaning: undefined },
      { name: "Babangida", type: "lastName", gender: "neutral", ethnicity: "hausa", meaning: undefined },
      { name: "Okoye", type: "lastName", gender: "neutral", ethnicity: "igbo", meaning: undefined },
      { name: "Abiodun", type: "lastName", gender: "neutral", ethnicity: "yoruba", meaning: "Born during festivity" },
      { name: "Chukwu", type: "lastName", gender: "neutral", ethnicity: "igbo", meaning: "God" },
      { name: "Adekunle", type: "lastName", gender: "neutral", ethnicity: "yoruba", meaning: undefined },
      { name: "Musa", type: "lastName", gender: "neutral", ethnicity: "hausa", meaning: undefined },
      { name: "Ogunleye", type: "lastName", gender: "neutral", ethnicity: "yoruba", meaning: undefined },
      { name: "Ibekwe", type: "lastName", gender: "neutral", ethnicity: "igbo", meaning: undefined }
    ];
    
    // Add titles
    initialTitles.forEach(title => {
      this.createTitle(title);
    });
    
    // Add first names
    initialFirstNames.forEach(name => {
      this.createName(name);
    });
    
    // Add last names
    initialLastNames.forEach(name => {
      this.createName(name);
    });
  }
}

export const storage = new MemStorage();
