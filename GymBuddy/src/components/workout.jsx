import { useLocation } from "react-router-dom";
import "../styles/workout.css";
const detailedPlans = {
  "Muscle Building": {
    "Monday": {
      workout: [
        { name: "Bench Press", howTo: "Lie on a flat bench. Lower the barbell to your chest, then press it back up." },
        { name: "Incline Dumbbell Press", howTo: "Sit on an incline bench. Press dumbbells up and bring them down slowly." },
        { name: "Tricep Dips", howTo: "Use parallel bars to lower your body, then push back up." },
        { name: "Cable Fly", howTo: "Stand between cable machines and bring handles together in front of your chest." },
        { name: "Push-ups", howTo: "Place hands shoulder-width apart and push your body up and down." }
      ],
      sets: 4,
      reps: "10-12 per set",
      duration: "60 minutes",
      diet: [
        "Breakfast: Oats with banana + boiled eggs",
        "Lunch: Grilled chicken + brown rice + vegetables",
        "Snack: Whey protein shake + almonds",
        "Dinner: Quinoa + fish + steamed broccoli"
      ]
    },
    "Tuesday": {
      workout: [
        { name: "Deadlift", howTo: "Keep back straight, lift the barbell from the floor to hips and back down." },
        { name: "Pull-Ups", howTo: "Hang on a bar and pull your chin above it." },
        { name: "Bent-over Rows", howTo: "Bend at hips and pull the barbell to your waist." },
        { name: "Lat Pulldown", howTo: "Pull the bar down to your chest while seated." },
        { name: "Hammer Curls", howTo: "Hold dumbbells at your sides and curl them up." }
      ],
      sets: 4,
      reps: "8-10 per set",
      duration: "60 minutes",
      diet: [
        "Breakfast: Greek yogurt + granola + honey",
        "Lunch: Tuna salad + sweet potato",
        "Snack: Protein bar + fruit",
        "Dinner: Lean beef + brown rice + green beans"
      ]
    },
    "Wednesday": {
      workout: [
        { name: "Squats", howTo: "Keep feet shoulder-width apart, lower hips and rise back." },
        { name: "Leg Press", howTo: "Push weight away using your legs while seated." },
        { name: "Lunges", howTo: "Step forward, lower knee to ground, push back to standing." },
        { name: "Hamstring Curl", howTo: "Lie on machine and curl legs toward glutes." },
        { name: "Calf Raises", howTo: "Raise heels off the ground while standing." }
      ],
      sets: 4,
      reps: "10-12 per set",
      duration: "60 minutes",
      diet: [
        "Breakfast: Peanut butter toast + eggs",
        "Lunch: Chicken wrap + salad",
        "Snack: Cottage cheese + fruit",
        "Dinner: Turkey + whole wheat pasta + vegetables"
      ]
    },
    "Thursday": {
      workout: [
        { name: "Overhead Press", howTo: "Press barbell upward from shoulders while standing." },
        { name: "Lateral Raises", howTo: "Raise dumbbells sideways to shoulder height." },
        { name: "Front Raises", howTo: "Lift dumbbells in front to shoulder level." },
        { name: "Arnold Press", howTo: "Twist dumbbells while pressing overhead." },
        { name: "Upright Row", howTo: "Lift barbell to chin, keeping it close to body." }
      ],
      sets: 3,
      reps: "10-12 per set",
      duration: "45 minutes",
      diet: [
        "Breakfast: Protein pancakes + berries",
        "Lunch: Egg salad sandwich + carrot sticks",
        "Snack: Banana + peanut butter",
        "Dinner: Salmon + wild rice + spinach"
      ]
    },
    "Friday": {
      workout: [
        { name: "Clean and Press", howTo: "Lift bar to shoulders then press overhead." },
        { name: "Kettlebell Swings", howTo: "Swing kettlebell from legs to chest height." },
        { name: "Burpees", howTo: "Jump, squat, push-up, repeat." },
        { name: "Mountain Climbers", howTo: "Run in place in a plank position." },
        { name: "Battle Ropes", howTo: "Wave heavy ropes in alternating motions." }
      ],
      sets: 4,
      reps: "12-15 per set",
      duration: "60 minutes",
      diet: [
        "Breakfast: Smoothie with protein, banana, spinach",
        "Lunch: Grilled chicken burrito bowl",
        "Snack: Hard boiled eggs + crackers",
        "Dinner: Baked tofu + soba noodles + stir-fried vegetables"
      ]
    },
    "Saturday": {
      workout: [
        { name: "Plank", howTo: "Hold a straight-body position on forearms and toes." },
        { name: "Russian Twists", howTo: "Twist torso side to side while holding weight." },
        { name: "Leg Raises", howTo: "Lie on back and raise legs to 90°." },
        { name: "Bicycle Crunches", howTo: "Alternate elbow-to-knee crunches." },
        { name: "Hanging Leg Raises", howTo: "Hang from bar and raise legs." }
      ],
      sets: 3,
      reps: "15-20 per set",
      duration: "45 minutes",
      diet: [
        "Breakfast: Muesli with skim milk",
        "Lunch: Shrimp salad + whole grain roll",
        "Snack: Greek yogurt + chia seeds",
        "Dinner: Stir-fried tofu + brown rice + veggies"
      ]
    },
    "Sunday": {
      workout: [
        { name: "Rest Day", howTo: "Focus on recovery, hydration, and light stretching." }
      ],
      sets: 0,
      reps: "0",
      duration: "Rest Day",
      diet: [
        "Breakfast: Light toast + fruit",
        "Lunch: Light protein salad",
        "Snack: Herbal tea + dry fruits",
        "Dinner: Soup + whole grain bread"
      ]
    }
  },
  "Weight Loss": {
    "Monday": {
      workout: [
        { name: "Jump Rope", howTo: "Jump continuously over a rope at a steady pace." },
        { name: "Burpees", howTo: "Jump, squat, push-up, and repeat." },
        { name: "Mountain Climbers", howTo: "Run in place from a plank position." },
        { name: "High Knees", howTo: "Run in place lifting your knees high." },
        { name: "Plank", howTo: "Hold body straight on forearms and toes." }
      ],
      sets: 4,
      reps: "30 seconds each",
      duration: "45 minutes",
      diet: [
        "Breakfast: Oatmeal with berries and flax seeds",
        "Lunch: Grilled chicken salad + lemon water",
        "Snack: Apple slices + peanut butter",
        "Dinner: Steamed fish + quinoa + broccoli"
      ]
    },
    "Tuesday": {
      workout: [
        { name: "Cycling", howTo: "Ride a stationary or outdoor bike at moderate pace." },
        { name: "Squat Jumps", howTo: "Jump up from squat position repeatedly." },
        { name: "Jumping Jacks", howTo: "Jump with legs and arms wide, then return." },
        { name: "Side Lunges", howTo: "Step to the side and lower your body." },
        { name: "Russian Twists", howTo: "Sit, twist torso side to side holding weight." }
      ],
      sets: 4,
      reps: "15 reps or 30 sec",
      duration: "50 minutes",
      diet: [
        "Breakfast: Smoothie with banana, spinach, protein powder",
        "Lunch: Turkey lettuce wrap + veggie sticks",
        "Snack: Low-fat yogurt + chia seeds",
        "Dinner: Grilled tofu + brown rice + green beans"
      ]
    },
    "Wednesday": {
      workout: [
        { name: "Zumba/Dance Cardio", howTo: "Follow a fun dance cardio routine." },
        { name: "Bodyweight Squats", howTo: "Lower and lift body without weights." },
        { name: "Push-ups", howTo: "Lower and lift body using arms." },
        { name: "Jump Squats", howTo: "Add a jump at the top of squats." },
        { name: "Plank to Push-up", howTo: "Move from plank to push-up position repeatedly." }
      ],
      sets: 3,
      reps: "15 reps",
      duration: "45 minutes",
      diet: [
        "Breakfast: Avocado toast + boiled egg",
        "Lunch: Chickpea salad + lemon water",
        "Snack: Mixed nuts (small portion)",
        "Dinner: Stir-fried veggies + tofu + quinoa"
      ]
    },
    "Thursday": {
      workout: [
        { name: "HIIT Circuit", howTo: "Alternate fast-paced exercises with rest." },
        { name: "Kettlebell Swings", howTo: "Swing kettlebell to shoulder height." },
        { name: "Box Jumps", howTo: "Jump onto and off a stable box." },
        { name: "Skaters", howTo: "Hop side to side like ice skating motion." },
        { name: "V-ups", howTo: "Lift arms and legs to form a 'V' shape." }
      ],
      sets: 3,
      reps: "30 seconds per move",
      duration: "50 minutes",
      diet: [
        "Breakfast: Fruit salad + Greek yogurt",
        "Lunch: Grilled salmon + mixed greens",
        "Snack: Carrot sticks + hummus",
        "Dinner: Baked sweet potato + grilled veggies"
      ]
    },
    "Friday": {
      workout: [
        { name: "Treadmill Run", howTo: "Jog/run at steady pace on treadmill." },
        { name: "Step-Ups", howTo: "Step up onto a box or platform, then down." },
        { name: "Lunges", howTo: "Step forward and lower knee." },
        { name: "Flutter Kicks", howTo: "Lie down and flutter your legs up/down." },
        { name: "Plank Jacks", howTo: "Jump legs in/out in plank position." }
      ],
      sets: 4,
      reps: "12-15 reps or 30 sec",
      duration: "50 minutes",
      diet: [
        "Breakfast: Low-fat cottage cheese + fruit",
        "Lunch: Tuna wrap + green salad",
        "Snack: Protein bar",
        "Dinner: Lentil soup + multigrain toast"
      ]
    },
    "Saturday": {
      workout: [
        { name: "Yoga Flow", howTo: "Follow a calming yoga sequence." },
        { name: "Side Plank", howTo: "Hold side position on one forearm." },
        { name: "Leg Raises", howTo: "Raise legs while lying on back." },
        { name: "Wall Sit", howTo: "Hold squat position against a wall." },
        { name: "Glute Bridges", howTo: "Lift hips from ground while lying." }
      ],
      sets: 3,
      reps: "30 sec to 1 min holds",
      duration: "40 minutes",
      diet: [
        "Breakfast: Muesli + almond milk",
        "Lunch: Grilled veggie wrap",
        "Snack: Green smoothie",
        "Dinner: Baked tofu + spinach salad"
      ]
    },
    "Sunday": {
      workout: [
        { name: "Active Recovery", howTo: "Do light walking, stretching, or yoga." }
      ],
      sets: 0,
      reps: "Recovery Day",
      duration: "30 minutes walk/yoga",
      diet: [
        "Breakfast: Herbal tea + fruit",
        "Lunch: Light quinoa salad",
        "Snack: Mixed fruit bowl",
        "Dinner: Soup + whole grain crackers"
      ]
    }
  },

  "General Fitness": {
    "Monday": {
      workout: [
        { name: "Jogging", howTo: "Run at a comfortable pace outdoors or on a treadmill." },
        { name: "Push-ups", howTo: "Lower and lift body using arms." },
        { name: "Squats", howTo: "Lower body while keeping back straight." },
        { name: "Lunges", howTo: "Step forward, bend knees, push back." },
        { name: "Plank", howTo: "Hold your body straight on forearms and toes." }
      ],
      sets: 3,
      reps: "12-15 per set",
      duration: "40 minutes",
      diet: [
        "Breakfast: Whole wheat toast + eggs",
        "Lunch: Grilled chicken sandwich + salad",
        "Snack: Yogurt + banana",
        "Dinner: Brown rice + veggies + paneer"
      ]
    },
    "Tuesday": {
      workout: [
        { name: "Cycling", howTo: "Pedal at a moderate pace for cardio." },
        { name: "Jumping Jacks", howTo: "Jump with arms and legs extended." },
        { name: "Mountain Climbers", howTo: "Run in place from plank position." },
        { name: "Dumbbell Shoulder Press", howTo: "Press dumbbells overhead from shoulders." },
        { name: "Wall Sit", howTo: "Hold sitting position against a wall." }
      ],
      sets: 3,
      reps: "10-12 per set or 30 sec",
      duration: "40 minutes",
      diet: [
        "Breakfast: Oats + honey + milk",
        "Lunch: Mixed veg curry + chapati",
        "Snack: Apple + handful of almonds",
        "Dinner: Grilled fish + salad"
      ]
    },
    "Wednesday": {
      workout: [
        { name: "Yoga Flow", howTo: "Follow a beginner-friendly yoga session." },
        { name: "Bird-Dog", howTo: "Extend opposite arm and leg while on all fours." },
        { name: "Leg Raises", howTo: "Raise legs from lying down position." },
        { name: "Bridge Pose", howTo: "Lift hips while lying on back." },
        { name: "Side Plank", howTo: "Hold side plank on one forearm." }
      ],
      sets: 2,
      reps: "Hold 30 seconds",
      duration: "35 minutes",
      diet: [
        "Breakfast: Smoothie bowl with fruits",
        "Lunch: Lentil soup + rice",
        "Snack: Trail mix",
        "Dinner: Baked vegetables + quinoa"
      ]
    },
    "Thursday": {
      workout: [
        { name: "Brisk Walk", howTo: "Walk quickly to elevate heart rate." },
        { name: "Push-ups", howTo: "Standard push-up motion." },
        { name: "Squat Hold", howTo: "Hold squat position for time." },
        { name: "Calf Raises", howTo: "Raise heels while standing." },
        { name: "Side Leg Lifts", howTo: "Lift legs to the side while standing or lying." }
      ],
      sets: 3,
      reps: "15 reps",
      duration: "40 minutes",
      diet: [
        "Breakfast: Idli + sambar",
        "Lunch: Rice + dal + veggies",
        "Snack: Boiled corn",
        "Dinner: Vegetable soup + bread"
      ]
    },
    "Friday": {
      workout: [
        { name: "Swimming or Light Cardio", howTo: "Engage in light aerobic activity." },
        { name: "Bicep Curls", howTo: "Curl dumbbells toward shoulders." },
        { name: "Overhead Dumbbell Press", howTo: "Press weights upward from shoulders." },
        { name: "Toe Touches", howTo: "Bend and touch toes while standing." },
        { name: "Arm Circles", howTo: "Rotate arms forward and backward." }
      ],
      sets: 2,
      reps: "15 reps or 30 sec",
      duration: "35-40 minutes",
      diet: [
        "Breakfast: Dosa + chutney",
        "Lunch: Chapati + veg curry",
        "Snack: Milk + dry fruits",
        "Dinner: Rice + spinach dal"
      ]
    },
    "Saturday": {
      workout: [
        { name: "Pilates or Core Work", howTo: "Follow a core-strengthening routine." },
        { name: "Crunches", howTo: "Lift shoulders off ground from lying position." },
        { name: "Leg Raises", howTo: "Lift legs straight up from floor." },
        { name: "Russian Twists", howTo: "Twist torso side-to-side holding a weight." },
        { name: "Glute Bridges", howTo: "Lift hips while keeping feet flat on floor." }
      ],
      sets: 3,
      reps: "15 reps",
      duration: "40 minutes",
      diet: [
        "Breakfast: Boiled eggs + toast",
        "Lunch: Chana masala + rice",
        "Snack: Cucumber + buttermilk",
        "Dinner: Roti + mixed veg curry"
      ]
    },
    "Sunday": {
      workout: [
        { name: "Rest Day", howTo: "Light walk or stretching recommended." }
      ],
      sets: 0,
      reps: "0",
      duration: "Rest Day",
      diet: [
        "Breakfast: Fruits + green tea",
        "Lunch: Simple khichdi",
        "Snack: Roasted peanuts",
        "Dinner: Soup + salad"
      ]
    }
  }
};

function Workout() {
  const location = useLocation();
  const selectedGoal = location.state?.goal || "Muscle Building";
  const selectedDay = location.state?.day || "Monday"; // fallback to Monday if not passe
  const dayPlan = detailedPlans[selectedGoal]?.[selectedDay];

  if (!dayPlan) {
    return (
      <div className="workout-plan-page">
        <h1 className="workout-plan-title">No Plan Found</h1>
        <p>No plan available for {selectedGoal} on {selectedDay}.</p>
      </div>
    );
  }

  return (
    <div className="workout-plan-page">
      <h1 className="workout-plan-title">{selectedGoal} - {selectedDay}</h1>
      <div className="workout-plan-card">
        <h2 className="workout-day-name">{selectedDay}</h2>
        <h3>Workout Plan</h3>
        <ul>
          {dayPlan.workout.map((ex, idx) => (
            <li key={idx}>
              <strong>{ex.name}</strong>: {ex.howTo}
            </li>
          ))}
        </ul>
        <p><strong>Sets:</strong> {dayPlan.sets}</p>
        <p><strong>Reps:</strong> {dayPlan.reps}</p>
        <p><strong>Duration:</strong> {dayPlan.duration}</p>

        <h3>Diet</h3>
        <ul>
          {dayPlan.diet.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Workout;

