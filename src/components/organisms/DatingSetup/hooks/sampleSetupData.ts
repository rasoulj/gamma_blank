import { IDatingSetupStageData } from "../types"



const fullNameStage: IDatingSetupStageData = {
    title: 'What\'s Your Name?',
    shortTitle: 'Name',
    subTitle: 'You are able to change this later',
    progressText: 'This name will be shown profile.',
    inputConfigs: [
        {
            defaultValue: '',
            rules: {
                required: 'Full Name is required',
            },
            type: 'text',
            title: 'Full Name',
            placeholder: 'John Doe',
            name: 'fullName',
        },
    ]
}

const dobStage: IDatingSetupStageData = {
    title: 'How Old Are You?',
    shortTitle: 'Birthday',
    subTitle: 'Use this to show your age',
    progressText: 'Your age will be shown on profile.',
    inputConfigs: [
        {
            defaultValue: new Date(2001, 1, 1),
            rules: {
                required: 'Birth date is required',

            },
            type: 'date',
            title: 'Birthday',
            placeholder: 'Your birthday',
            name: 'dob',
        },
    ]
}

const genderStage: IDatingSetupStageData = {
    title: 'What Is Your Gender?',
    shortTitle: 'Gender',
    subTitle: 'Pick which best describes you',
    progressText: 'Your gender will be shown on profile.',
    inputConfigs: [
        {
            defaultValue: 0,
            rules: {
                min: {
                    value: 1,
                    message: 'Select an option please'
                }
            },
            type: 'select',
            title: '',
            name: 'gender',
            options: [
                { title: 'Male', value: 1 },
                { title: 'Female', value: 2 },
                { title: 'Non binary', value: 3 },
            ]
        }
    ]
}

const whyStage: IDatingSetupStageData = {
    title: 'Why are You Here?',
    shortTitle: 'Why you here',
    subTitle: 'You can change this whenever you want',
    progressText: 'Your answer will be shown on profile',
    inputConfigs: [
        {
            defaultValue: 0,
            rules: {
                min: {
                    value: 1,
                    message: 'Select an option please'
                }
            },
            type: 'select',
            title: '',
            name: 'why',
            options: [
                {
                    title: 'Here to Date',
                    subtitle: 'I want to find someone to date',
                    value: 1,
                    icon: 'icon',
                },
                {
                    title: 'Make a New Friends',
                    subtitle: 'Talk with Others with a Good Time',
                    value: 2,
                    icon: 'icon',
                },
                {
                    title: 'Ready for a Relationship',
                    subtitle: 'Looking for something that lasts',
                    value: 3,
                    icon: 'icon',
                },
            ]
        }
    ]
}

const profilePicturesStage: IDatingSetupStageData = {
    title: 'Choose Your Photos & Videos',
    subTitle: 'Upload at least 2 photos to get started',
    progressText: 'Your images will be shown on profile.',

    inputConfigs: [
        {
            rules: {
                validate: (value: string[]) => {

                    const coverPhotoUri = value[0];
                    if ((coverPhotoUri ?? '') === '') return "Choose your cover photo";
                    return null;
                }
            },
            type: 'profile-pictures',
            name: 'profilePictures',
            defaultValue: [],
            title: '',
        }
    ]
}

const interestsStage: IDatingSetupStageData = {
    title: 'Your Interests',
    shortTitle: 'Interest',
    subTitle: 'Pick between 3 to 6 interests',
    progressText: 'Your interests will be shown on profile.',
    inputConfigs: [
        {
            defaultValue: [],
            rules: {
                validate: (value: number[]) => {
                    const len = value.length;
                    if (len < 3) return "At least 3 items must be selected";
                    if (len > 6) return "At most 6 items can be selected"
                    return null;
                },
            },

            type: 'multi-select',
            title: undefined,
            name: 'interests',
            options: [
                { title: 'Creativity', value: -1 },
                { title: 'Design', value: 1 },
                { title: 'Photography', value: 2 },
                { title: 'Dancing', value: 3 },
                { title: 'Crafts', value: 4 },
                { title: 'Dancing', value: 5 },
                { title: 'Videography', value: 6 },
                { title: 'Writing', value: 7 },

                { title: 'Sports', value: -2 },
                { title: 'Yoga', value: 11 },
                { title: 'Marathon', value: 12 },
                { title: 'Kayak', value: 13 },
                { title: 'Movie', value: 14 },
                { title: 'Gaming', value: 15 },
                { title: 'Tennis', value: 16 },
                { title: 'Basketball', value: 17 },
                { title: 'Gym', value: 18 },

            ]
        }
    ]
}


const sexOrientationStage: IDatingSetupStageData = {
    title: 'What Is Your Sexual Orientation?',
    shortTitle: 'Sexuality',
    subTitle: 'Pick which best describes you',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: 0,
            type: 'select',
            title: '',
            name: 'sexOrientation',
            options: [
                { title: 'Straight', value: 1 },
                { title: 'Gay', value: 2 },
                { title: 'Lesbian', value: 3 },
                { title: 'Bisexual', value: 4 },
                { title: 'Asexual', value: 5 },
                { title: 'Demisexual', value: 6 },
                { title: 'Pansexual', value: 7 },
                { title: 'Queer', value: 8 },
                { title: 'Questioning', value: 9 },
                { title: 'Prefer not to say', value: 10 },
            ]
        }
    ]
}

const whoStage: IDatingSetupStageData = {
    title: 'Who Do You Want To Date?',
    subTitle: 'Pick which best describes you',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: 0,
            type: 'select',
            title: '',
            name: 'who',
            options: [
                { title: 'Women', value: 1 },
                { title: 'Men', value: 2 },
                { title: 'Nonbinary', value: 3 },
                { title: 'Everyone', value: 4 },
            ]
        }
    ]
}

const relationStatusStage: IDatingSetupStageData = {
    title: 'What Is Your relationship status?',
    shortTitle: 'Relationship',
    subTitle: 'Pick which best describes you',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: 0,
            type: 'select',
            title: '',
            name: 'relationStatus',
            options: [
                { title: 'Single', value: 1 },
                { title: 'Taken', value: 2 },
                { title: 'It\'s complicated', value: 3 },
                { title: 'Open', value: 4 },
                { title: 'Prefer not to say', value: 5 },
            ]
        }
    ]
}

const bioStage: IDatingSetupStageData = {
    title: 'Write a Bio To Introduce Yourself',
    shortTitle: 'Bio',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: '',
            type: 'textarea',
            title: 'Bio',
            placeholder: 'Sara Snow',
            name: 'bio',
        }
    ]
}

const heightStage: IDatingSetupStageData = {
    title: 'How is your height?',
    shortTitle: 'Height',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: 185,
            type: 'slider',
            title: 'Bio',
            placeholder: 'Sara Snow',
            name: 'height',
        }
    ]
}


const universityStage: IDatingSetupStageData = {
    title: 'Your University Is',
    shortTitle: 'Education',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: '',
            type: 'university',
            title: 'University Name',
            placeholder: 'Select university ...',
            name: 'university',
        }
    ]
}

const whatDoYouDoStage: IDatingSetupStageData = {
    title: 'What Do You Do?',
    shortTitle: 'Work',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: '',
            type: 'text',
            title: 'Job Title',
            placeholder: 'Azad',
            name: 'jobTitle',
        },
        {
            defaultValue: '',
            type: 'text',
            title: 'Company name',
            placeholder: 'Apsy',
            name: 'jobCompany',
        },

    ]
}


const drinkStage: IDatingSetupStageData = {
    title: 'Do You Drink?',
    shortTitle: 'Drinking',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: 0,
            type: 'select',
            title: '',
            name: 'drink',
            options: [
                { title: 'Socially', value: 1 },
                { title: 'Never', value: 2 },
                { title: 'Often', value: 3 },
                { title: 'No, I\'m sober', value: 4 },
                { title: 'Prefer not to say', value: 5 },
            ]
        }
    ]
}

const smokeStage: IDatingSetupStageData = {
    title: 'Do You Smoke?',
    shortTitle: 'Smoking',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: 0,
            type: 'select',
            title: '',
            name: 'smoke',
            options: [
                { title: 'Yes', value: 1 },
                { title: 'No', value: 2 },
                { title: 'Sometimes', value: 3 },
                { title: 'Prefer not to say', value: 4 },
            ]
        }
    ]
}

const drugStage: IDatingSetupStageData = {
    title: 'Do You do Drugs?',
    shortTitle: 'Drug',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: 0,
            type: 'select',
            title: '',
            name: 'drug',
            options: [
                { title: 'Yes', value: 1 },
                { title: 'No', value: 2 },
                { title: 'Sometimes', value: 3 },
                { title: 'Prefer not to say', value: 4 },
            ]
        }
    ]
}

const kidsStage: IDatingSetupStageData = {
    title: 'How Do You Feel About Kids?',
    shortTitle: 'Kids',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: 0,
            type: 'select',
            title: '',
            name: 'kids',
            options: [
                { title: 'I\'d like them someday', value: 1 },
                { title: 'I\'d like them soon', value: 2 },
                { title: 'I don\'t want kids', value: 3 },
                { title: 'I already have kids', value: 4 },
                { title: 'Prefer not to say', value: 5 },
            ]
        }
    ]
}

const educationStage: IDatingSetupStageData = {
    title: 'What Level Of Education Do You Have?',
    shortTitle: 'Education level',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: 0,
            type: 'select',
            title: '',
            name: 'education',
            options: [
                { title: 'High school', value: 1 },
                { title: 'Graduate degree or higher', value: 2 },
                { title: 'In grad School', value: 3 },
                { title: 'In college', value: 4 },
                { title: 'Undergraduate degree', value: 5 },
                { title: 'Prefer not to say', value: 6 },
            ]
        }
    ]
}

const introvertStage: IDatingSetupStageData = {
    title: 'Are You An Introvert Or An Extrovert?',
    shortTitle: 'Personality',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: 0,
            type: 'select',
            title: '',
            name: 'introvert',
            options: [
                { title: 'Introvert', value: 1 },
                { title: 'Extrovert', value: 2 },
                { title: 'Somewhere in between', value: 3 },
                { title: 'Prefer not to say', value: 4 },
            ]
        }
    ]
}


const petsStage: IDatingSetupStageData = {
    title: 'Do You Have Pets',
    shortTitle: 'Pets',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: 0,
            type: 'select',
            title: '',
            name: 'pets',
            options: [
                { title: 'Cat', value: 1 },
                { title: 'Dog', value: 2 },
                { title: 'Both cats and dogs', value: 3 },
                { title: 'Other animals', value: 4 },
                { title: 'No pets', value: 5 },
                { title: 'Prefer not to say', value: 6 },
            ]
        }
    ]
}

const moreStage: IDatingSetupStageData = {
    title: 'Do You Want Others To Know More About You?',
    shortTitle: 'Your Questions',
    subTitle: 'You are able to change this later',
    progressText: undefined,
    inputConfigs: [
        {
            defaultValue: [
                { q: '', a: '' },
            ],
            type: 'questions',
            title: '',
            name: 'moreQuestions',
        }
    ]
}

export const sampleSetupData = [
    fullNameStage,              //0
    dobStage,                   //1
    genderStage,                //2
    whyStage,                   //3
    interestsStage,             //4
    profilePicturesStage,       //5
    sexOrientationStage,        //6
    whoStage,                   //7
    relationStatusStage,        //8
    bioStage,                   //9
    heightStage,                //10
    universityStage,            //11
    whatDoYouDoStage,           //12
    drinkStage,                 //13
    smokeStage,                 //14
    drugStage,                  //15
    kidsStage,                  //16
    educationStage,             //17
    introvertStage,             //18
    petsStage,                  //19
    moreStage,                  //20
]
