// Nigerian titles, first names and last names for backup in case API fails

export const TITLES = [
  { title: "Chief", gender: "male", ethnicity: "any" },
  { title: "Aunty", gender: "female", ethnicity: "any" },
  { title: "Uncle", gender: "male", ethnicity: "any" },
  { title: "Ma", gender: "female", ethnicity: "any" },
  { title: "Odogwu", gender: "male", ethnicity: "igbo" },
  { title: "Oga", gender: "male", ethnicity: "any" },
  { title: "Alhaji", gender: "male", ethnicity: "hausa" },
  { title: "Alhaja", gender: "female", ethnicity: "hausa" },
  { title: "Madam", gender: "female", ethnicity: "any" },
  { title: "Nne", gender: "female", ethnicity: "igbo" }
];

export const FIRST_NAMES = [
  { name: "Oluwaseun", gender: "neutral", ethnicity: "yoruba", meaning: "God has done this for me" },
  { name: "Chioma", gender: "female", ethnicity: "igbo", meaning: "Good God" },
  { name: "Adebayo", gender: "male", ethnicity: "yoruba", meaning: "The crown meets joy" },
  { name: "Ngozi", gender: "female", ethnicity: "igbo", meaning: "Blessing" },
  { name: "Emeka", gender: "male", ethnicity: "igbo", meaning: "God has done well" },
  { name: "Folake", gender: "female", ethnicity: "yoruba", meaning: "Use wealth to pamper this" },
  { name: "Onyeka", gender: "neutral", ethnicity: "igbo", meaning: "Who is greater than God" },
  { name: "Tunde", gender: "male", ethnicity: "yoruba", meaning: "The return of a loved one" },
  { name: "Amara", gender: "female", ethnicity: "igbo", meaning: "Grace" },
  { name: "Obinna", gender: "male", ethnicity: "igbo", meaning: "Father's heart" },
  { name: "Yewande", gender: "female", ethnicity: "yoruba", meaning: "Mother has returned" },
  { name: "Chinedu", gender: "male", ethnicity: "igbo", meaning: "God leads" },
  { name: "Funmilayo", gender: "female", ethnicity: "yoruba", meaning: "Give me joy" },
  { name: "Olumide", gender: "male", ethnicity: "yoruba", meaning: "God has come" },
  { name: "Nneka", gender: "female", ethnicity: "igbo", meaning: "Mother is supreme" },
  { name: "Adewale", gender: "male", ethnicity: "yoruba", meaning: "The crown has come home" },
  { name: "Zainab", gender: "female", ethnicity: "hausa", meaning: "Fragrant flower" },
  { name: "Ikenna", gender: "male", ethnicity: "igbo", meaning: "Father's strength" },
  { name: "Aisha", gender: "female", ethnicity: "hausa", meaning: "Prosperous life" },
  { name: "Nnamdi", gender: "male", ethnicity: "igbo", meaning: "My father is alive" },
  { name: "Chiamaka", gender: "female", ethnicity: "igbo", meaning: "God is beautiful" },
  { name: "Ekundayo", gender: "neutral", ethnicity: "yoruba", meaning: "Sorrow becomes joy" },
  { name: "Ebere", gender: "female", ethnicity: "igbo", meaning: "Mercy" },
  { name: "Kehinde", gender: "neutral", ethnicity: "yoruba", meaning: "The second-born of twins" }
];

export const LAST_NAMES = [
  { name: "Okafor", ethnicity: "igbo" },
  { name: "Adeyemi", ethnicity: "yoruba" },
  { name: "Okonkwo", ethnicity: "igbo" },
  { name: "Eze", ethnicity: "igbo", meaning: "King" },
  { name: "Adebisi", ethnicity: "yoruba" },
  { name: "Nwachukwu", ethnicity: "igbo", meaning: "Child of God" },
  { name: "Olawale", ethnicity: "yoruba" },
  { name: "Uzoma", ethnicity: "igbo", meaning: "Good road" },
  { name: "Obasanjo", ethnicity: "yoruba" },
  { name: "Igwe", ethnicity: "igbo", meaning: "Highness" },
  { name: "Afolayan", ethnicity: "yoruba" },
  { name: "Nwosu", ethnicity: "igbo" },
  { name: "Babangida", ethnicity: "hausa" },
  { name: "Okoye", ethnicity: "igbo" },
  { name: "Abiodun", ethnicity: "yoruba", meaning: "Born during festivity" },
  { name: "Chukwu", ethnicity: "igbo", meaning: "God" },
  { name: "Adekunle", ethnicity: "yoruba" },
  { name: "Musa", ethnicity: "hausa" },
  { name: "Ogunleye", ethnicity: "yoruba" },
  { name: "Ibekwe", ethnicity: "igbo" }
];

export const ETHNICITIES = [
  { id: "yoruba", name: "Yoruba" },
  { id: "igbo", name: "Igbo" },
  { id: "delta", name: "Delta" },
  { id: "hausa", name: "Hausa" }
];

// Fallback function to generate name in case API fails
export const generateLocalName = (
  options: {
    gender?: string;
    ethnicity?: string;
    personalName?: string;
    isPremium?: boolean;
  } = {}
) => {
  const { gender = 'any', ethnicity = 'any', personalName, isPremium = false } = options;
  
  // Filter titles
  const filteredTitles = TITLES.filter(title => 
    (gender === 'any' || title.gender === gender || title.gender === 'neutral') &&
    (ethnicity === 'any' || title.ethnicity === 'any' || title.ethnicity === ethnicity)
  );
  
  // Filter first names
  const filteredFirstNames = FIRST_NAMES.filter(name => 
    (gender === 'any' || name.gender === gender || name.gender === 'neutral') &&
    (ethnicity === 'any' || name.ethnicity === ethnicity)
  );
  
  // Filter last names
  const filteredLastNames = LAST_NAMES.filter(name => 
    (ethnicity === 'any' || name.ethnicity === ethnicity)
  );
  
  // Randomly select
  const randomTitle = filteredTitles[Math.floor(Math.random() * filteredTitles.length)] || TITLES[0];
  const randomFirstName = filteredFirstNames[Math.floor(Math.random() * filteredFirstNames.length)] || FIRST_NAMES[0];
  const randomLastName = filteredLastNames[Math.floor(Math.random() * filteredLastNames.length)] || LAST_NAMES[0];
  
  // Construct name
  let firstName = randomFirstName.name;
  
  // If personalName provided and premium
  if (personalName && isPremium) {
    // Mix personal name with Nigerian name
    firstName = personalName + randomFirstName.name.substring(3);
  }
  
  return {
    fullName: `${randomTitle.title} ${firstName} ${randomLastName.name}`,
    title: randomTitle.title,
    firstName,
    lastName: randomLastName.name,
    meaning: randomFirstName.meaning || "",
    ethnicity: randomFirstName.ethnicity
  };
};
