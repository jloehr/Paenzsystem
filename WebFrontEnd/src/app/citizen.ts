export class Citizen {
	CitizenID: string;
    FirstName: string;
    LastName: string;
    Birthdate: any;
    Parent: {
    	FirstName: string;
    	LastName: string;
    	Phone: string;
    	Email: string;
    };
    Annotation: string;
    CheckIns: [any];
    CheckOuts: [any];
}
