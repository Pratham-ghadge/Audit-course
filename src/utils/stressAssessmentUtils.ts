
// Stress type definitions
export type StressType = 'Physical' | 'Mental' | 'Emotional' | 'Environmental';
export type StressLevel = 'Low' | 'Moderate' | 'High' | 'Severe';

// Question interface
export interface Question {
  id: number;
  text: string;
  category: StressType;
  options: { value: number; label: string }[];
}

// Assessment questions
export const assessmentQuestions: Question[] = [
  {
    id: 1,
    text: "How often do you experience physical tension or pain (headaches, neck pain, etc.)?",
    category: "Physical",
    options: [
      { value: 0, label: "Rarely or never" },
      { value: 1, label: "Occasionally" },
      { value: 2, label: "Often" },
      { value: 3, label: "Almost daily" }
    ]
  },
  {
    id: 2,
    text: "How would you rate your overall energy levels?",
    category: "Physical",
    options: [
      { value: 0, label: "High energy most days" },
      { value: 1, label: "Moderate energy" },
      { value: 2, label: "Low energy often" },
      { value: 3, label: "Constantly fatigued" }
    ]
  },
  {
    id: 3,
    text: "How often do you have trouble falling or staying asleep?",
    category: "Physical",
    options: [
      { value: 0, label: "Rarely or never" },
      { value: 1, label: "1-2 nights a week" },
      { value: 2, label: "3-5 nights a week" },
      { value: 3, label: "Almost every night" }
    ]
  },
  {
    id: 4,
    text: "How difficult is it for you to focus on tasks or concentrate?",
    category: "Mental",
    options: [
      { value: 0, label: "Not difficult at all" },
      { value: 1, label: "Slightly difficult" },
      { value: 2, label: "Moderately difficult" },
      { value: 3, label: "Very difficult" }
    ]
  },
  {
    id: 5,
    text: "How often do you feel overwhelmed by your responsibilities?",
    category: "Mental",
    options: [
      { value: 0, label: "Rarely or never" },
      { value: 1, label: "Occasionally" },
      { value: 2, label: "Often" },
      { value: 3, label: "Almost daily" }
    ]
  },
  {
    id: 6,
    text: "How frequently do you find yourself worrying about the future?",
    category: "Mental",
    options: [
      { value: 0, label: "Rarely or never" },
      { value: 1, label: "Occasionally" },
      { value: 2, label: "Often" },
      { value: 3, label: "Almost constantly" }
    ]
  },
  {
    id: 7,
    text: "How often do you feel irritable or angry?",
    category: "Emotional",
    options: [
      { value: 0, label: "Rarely or never" },
      { value: 1, label: "Occasionally" },
      { value: 2, label: "Often" },
      { value: 3, label: "Almost daily" }
    ]
  },
  {
    id: 8,
    text: "How often do you experience mood swings?",
    category: "Emotional",
    options: [
      { value: 0, label: "Rarely or never" },
      { value: 1, label: "Occasionally" },
      { value: 2, label: "Often" },
      { value: 3, label: "Almost daily" }
    ]
  },
  {
    id: 9,
    text: "How frequently do you feel sad or down?",
    category: "Emotional",
    options: [
      { value: 0, label: "Rarely or never" },
      { value: 1, label: "Occasionally" },
      { value: 2, label: "Often" },
      { value: 3, label: "Almost daily" }
    ]
  },
  {
    id: 10,
    text: "How much do your surroundings (noise, overcrowding, etc.) affect your stress levels?",
    category: "Environmental",
    options: [
      { value: 0, label: "Very little or not at all" },
      { value: 1, label: "Somewhat" },
      { value: 2, label: "Moderately" },
      { value: 3, label: "Significantly" }
    ]
  },
  {
    id: 11,
    text: "How stressful is your work or school environment?",
    category: "Environmental",
    options: [
      { value: 0, label: "Not stressful" },
      { value: 1, label: "Mildly stressful" },
      { value: 2, label: "Moderately stressful" },
      { value: 3, label: "Very stressful" }
    ]
  },
  {
    id: 12,
    text: "How much stress do your relationships (family, friends, romantic) cause you?",
    category: "Environmental",
    options: [
      { value: 0, label: "Very little or none" },
      { value: 1, label: "Some stress" },
      { value: 2, label: "Moderate stress" },
      { value: 3, label: "Significant stress" }
    ]
  }
];

// Analysis function to determine stress type and level
export const analyzeStressResults = (answers: Record<number, number>): {
  primaryStressType: StressType;
  stressLevel: StressLevel;
  scores: Record<StressType, number>;
} => {
  // Initialize category scores
  const scores: Record<StressType, number> = {
    Physical: 0,
    Mental: 0,
    Emotional: 0,
    Environmental: 0
  };
  
  // Calculate scores for each category
  assessmentQuestions.forEach(question => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      scores[question.category] += answer;
    }
  });
  
  // Determine primary stress type (highest score)
  const primaryStressType = Object.entries(scores).reduce(
    (max, [type, score]) => score > scores[max] ? type as StressType : max,
    "Physical" as StressType
  );
  
  // Calculate total score to determine overall stress level
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const maxPossibleScore = assessmentQuestions.length * 3; // 3 is max value per question
  
  // Determine stress level based on percentage of max score
  const scorePercentage = (totalScore / maxPossibleScore) * 100;
  
  let stressLevel: StressLevel;
  if (scorePercentage < 25) {
    stressLevel = "Low";
  } else if (scorePercentage < 50) {
    stressLevel = "Moderate";
  } else if (scorePercentage < 75) {
    stressLevel = "High";
  } else {
    stressLevel = "Severe";
  }
  
  return {
    primaryStressType,
    stressLevel,
    scores
  };
};

// Get recommendations based on stress type and level
export const getRecommendations = (
  stressType: StressType,
  stressLevel: StressLevel
): {
  yogaPractices: {title: string; description: string; videoUrl: string}[];
  remedies: string[];
  articles: {title: string; description: string; url: string}[];
} => {
  
  // Yoga recommendations
  const yogaRecommendations: Record<StressType, {title: string; description: string; videoUrl: string}[]> = {
    Physical: [
      {
        title: "Gentle Stretching Routine",
        description: "Release physical tension with these gentle stretches for your neck, shoulders, and back.",
        videoUrl: "https://www.youtube.com/embed/EvMTrP8eRvM" // 15 min Gentle Yoga for Flexibility & Stress Reduction
      },
      {
        title: "Restorative Yoga",
        description: "Deeply relaxing poses held with props to support complete relaxation of the body.",
        videoUrl: "https://www.youtube.com/embed/rrLkhg3fA0M" // Restorative Yoga + Meditation | No Props 35-Minute Relaxing Practice
      },
      {
        title: "Yoga for Better Sleep",
        description: "Gentle movement and breathing to prepare your body for restful sleep.",
        videoUrl: "https://www.youtube.com/embed/v7SN-d4qXx0" // 20 Minute Bedtime Yoga Practice | Yoga With Adriene
      }
    ],
    Mental: [
      {
        title: "Mindful Yoga Flow",
        description: "A slow-paced practice that encourages present-moment awareness and concentration.",
        videoUrl: "https://www.youtube.com/embed/IBTdBA_lIZI" // Mindful Yoga Flow | 40 Minutes - Full Body Stretch
      },
      {
        title: "Breath-Focused Yoga",
        description: "Simple poses coordinated with breath to calm an overactive mind.",
        videoUrl: "https://www.youtube.com/embed/Olt_RML-uIE" // Slow & Gentle Breath Centered Full Body Yoga Flow || 20 mins
      },
      {
        title: "Yoga for Mental Clarity",
        description: "Poses and breathing techniques to clear mental fog and improve focus.",
        videoUrl: "https://www.youtube.com/embed/xe3D7vKvtok" // Yoga For Concentration and Mental Focus | Yoga With Adriene
      }
    ],
    Emotional: [
      {
        title: "Heart-Opening Yoga",
        description: "Chest and shoulder openers to release emotional tension and promote feelings of openness.",
        videoUrl: "https://www.youtube.com/embed/DSRc2UsQ_cw" // 30 min Heart Opening Yoga - UPPER BODY Healing Flow
      },
      {
        title: "Yoga for Emotional Balance",
        description: "A practice designed to regulate mood and process difficult emotions.",
        videoUrl: "https://www.youtube.com/embed/BKo6GVMA8K8" // Yoga for Emotional Balance | 10 Minutes
      },
      {
        title: "Grounding Yoga Practice",
        description: "Stabilizing poses to help you feel centered and emotionally secure.",
        videoUrl: "https://www.youtube.com/embed/FQ74ZykbFFE" // Grounding Yoga Practice | Happy Earth Day!
      }
    ],
    Environmental: [
      {
        title: "Creating a Personal Sanctuary",
        description: "A yoga sequence that helps you create boundaries and find peace regardless of your surroundings.",
        videoUrl: "https://www.youtube.com/embed/MmeOkZzmo_0" // How To Create A Home Yoga Space? - The Personal Growth Path
      },
      {
        title: "5-Minute Desk Yoga",
        description: "Quick stress relief you can do at your desk or in a small space.",
        videoUrl: "https://www.youtube.com/embed/tAUf7aajBWE" // Yoga at Your Desk
      },
      {
        title: "Yoga for Stress Resilience",
        description: "Build your capacity to stay centered in challenging environments.",
        videoUrl: "https://www.youtube.com/embed/1-yk9eiCG-8" // 15-Minute Practice for Stress Resilience
      }
    ]
  };
  
  // Remedies and techniques
  const remedyRecommendations: Record<StressType, string[]> = {
    Physical: [
      "Progressive muscle relaxation: Tense and release each muscle group",
      "Epsom salt baths to relieve muscle tension",
      "Regular physical activity like walking or swimming",
      "Ensure 7-9 hours of quality sleep each night",
      "Stay hydrated and maintain a balanced diet"
    ],
    Mental: [
      "Meditation practice for 10-15 minutes daily",
      "Digital detox periods throughout the day",
      "Task prioritization and time management techniques",
      "Reading or engaging in hobbies that require focus",
      "Journaling to organize thoughts and reduce mental clutter"
    ],
    Emotional: [
      "Practice self-compassion exercises",
      "Connect with supportive friends and family",
      "Expressive arts like painting or music",
      "Maintain a gratitude journal",
      "Consider speaking with a therapist or counselor"
    ],
    Environmental: [
      "Create a dedicated relaxation space in your home",
      "Use noise-cancelling headphones in loud environments",
      "Incorporate plants into your living and working spaces",
      "Set boundaries with people who cause stress",
      "Practice time in nature when possible"
    ]
  };
  
  // Articles
  const articleRecommendations: Record<StressType, {title: string; description: string; url: string}[]> = {
    Physical: [
      {
        title: "Understanding the Body's Stress Response",
        description: "Learn how physical stress manifests and affects your health long-term.",
        url: "https://www.apa.org/topics/stress/body" // American Psychological Association
      },
      {
        title: "Nutrition for Stress Management",
        description: "How certain foods can help your body better cope with stress.",
        url: "https://www.healthline.com/nutrition/stress-and-nutrition" // Healthline
      },
      {
        title: "The Sleep-Stress Connection",
        description: "Why good sleep is crucial for managing physical stress and how to improve yours.",
        url: "https://www.sleepfoundation.org/mental-health/stress-and-sleep" // Sleep Foundation
      }
    ],
    Mental: [
      {
        title: "Cognitive Techniques for Managing Worry",
        description: "Practical thought exercises to reduce excessive worrying and mental strain.",
        url: "https://www.verywellmind.com/how-to-use-cognitive-behavioral-techniques-5188808" // Verywell Mind
      },
      {
        title: "Mindfulness for Mental Clarity",
        description: "How present-moment awareness can cut through mental fog and improve focus.",
        url: "https://www.mindful.org/what-is-mindfulness/" // Mindful.org
      },
      {
        title: "Breaking the Cycle of Overthinking",
        description: "Strategies to stop rumination and mental loops that increase stress.",
        url: "https://www.healthline.com/health/how-to-stop-ruminating" // Healthline
      }
    ],
    Emotional: [
      {
        title: "Emotional Intelligence in Stressful Times",
        description: "How to recognize, understand and manage your emotions effectively.",
        url: "https://www.helpguide.org/articles/mental-health/emotional-intelligence-eq.htm" // HelpGuide
      },
      {
        title: "The Science of Positive Psychology",
        description: "Evidence-based approaches to cultivate positive emotions even during stress.",
        url: "https://positivepsychology.com/what-is-positive-psychology-definition/" // Positive Psychology
      },
      {
        title: "Processing Difficult Emotions",
        description: "Healthy ways to experience and move through challenging feelings.",
        url: "https://psychcentral.com/health/how-to-process-your-emotions" // Psych Central
      }
    ],
    Environmental: [
      {
        title: "Creating Boundaries in a Connected World",
        description: "How to protect your peace when external demands are constant.",
        url: "https://www.psychologytoday.com/us/blog/emotional-nourishment/202205/setting-boundaries-is-self-care" // Psychology Today
      },
      {
        title: "Designing Spaces for Well-being",
        description: "Simple changes to your environment that can reduce stress.",
        url: "https://www.nytimes.com/guides/smarterliving/how-to-make-your-home-more-relaxing" // NYTimes Guide
      },
      {
        title: "Navigating Toxic Relationships",
        description: "Identifying and managing relationships that contribute to your stress levels.",
        url: "https://www.verywellmind.com/signs-of-toxic-relationships-5206811" // Verywell Mind
      }
    ]
  };
  
  
  // Adjust recommendations based on stress level
  let yogaPractices = yogaRecommendations[stressType];
  let remedies = remedyRecommendations[stressType];
  let articles = articleRecommendations[stressType];
  
  // For higher stress levels, add more recommendations
  if (stressLevel === "High" || stressLevel === "Severe") {
    // Add recommendations from other categories that might help
    const secondaryType: StressType = stressType === "Physical" ? "Mental" : "Physical";
    yogaPractices = [...yogaPractices, yogaRecommendations[secondaryType][0]];
    remedies = [...remedies, remedyRecommendations[secondaryType][0]];
  }
  
  return {
    yogaPractices,
    remedies,
    articles
  };
};
