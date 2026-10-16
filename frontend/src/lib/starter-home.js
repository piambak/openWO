// Home starter plan: no gym, no equipment — a mat, a wall and a sturdy chair are enough.
// Each routine targets one area, so the week can be split by muscle group the way the gym
// plan is split by push/pull/legs. Exercise ids come from the bundled dataset (all of them
// are 'body weight' there). Entries are [id, sets, reps] or [id, sets, 'sec', seconds] for holds.
import { uid } from './format.js'

const R = (id, sets, reps) => ({ id, sets, reps, weight: 0, mode: 'reps', bodyweight: true })
const T = (id, sets, sec) => ({ id, sets, sec, weight: 0, mode: 'time', bodyweight: true })

const SPEC = [
  { key: 'legs', name: 'Home Legs & Glutes', emoji: 'legs', ex: () => [
    R('1685', 3, 15),   // squat to overhead reach
    R('2368', 3, 12),   // split squats
    R('1460', 3, 12),   // walking lunge
    R('3769', 3, 12),   // curtsey squat
    R('3013', 3, 15),   // low glute bridge on floor
    R('1373', 3, 20)    // bodyweight standing calf raise
  ] },
  { key: 'push', name: 'Home Chest & Shoulders', emoji: 'figureStrength', ex: () => [
    R('0662', 3, 10),   // push-up
    R('0493', 3, 12),   // incline push-up (hands on a chair)
    R('0279', 3, 8),    // decline push-up (feet on a chair)
    R('1311', 3, 8),    // wide hand push-up
    R('0699', 3, 10),   // shoulder tap push-up
    T('1297', 3, 20)    // isometric chest squeeze
  ] },
  { key: 'back', name: 'Home Back', emoji: 'pullup', ex: () => [
    R('2300', 3, 8),    // inverted row, bent knees (under a sturdy table)
    R('3166', 3, 12),   // bodyweight standing row
    R('1773', 3, 12),   // one arm towel row
    R('3021', 3, 12),   // scapula push-up
    R('1772', 3, 10),   // elbow lift - reverse push-up
    R('1352', 3, 12)    // lower back curl
  ] },
  { key: 'core', name: 'Home Core', emoji: 'abs', ex: () => [
    R('0274', 3, 15),   // crunch floor
    R('0872', 3, 12),   // reverse crunch
    R('0276', 3, 12),   // dead bug
    R('0687', 3, 20),   // russian twist
    R('0464', 3, 12),   // front plank with twist
    T('0705', 3, 30)    // side bridge
  ] },
  { key: 'arms', name: 'Home Arms', emoji: 'arm', ex: () => [
    R('0259', 3, 10),   // close-grip push-up
    R('0283', 3, 8),    // diamond push-up
    R('0672', 3, 12),   // reverse dip (hands on a chair)
    R('1771', 3, 12),   // bodyweight kneeling triceps extension
    R('1769', 3, 12),   // bodyweight side lying biceps curl
    R('1770', 3, 12)    // biceps leg concentration curl
  ] },
  { key: 'cardio', name: 'Home Cardio (HIIT)', emoji: 'figureRun', ex: () => [
    R('0630', 3, 30),   // mountain climber
    R('1160', 3, 10),   // burpee
    R('0514', 3, 15),   // jump squat
    R('3361', 3, 20),   // skater hops
    R('3360', 3, 10),   // bear crawl
    R('3636', 3, 30)    // high knee against wall
  ] },
  { key: 'full', name: 'Home Full Body', emoji: 'flame', ex: () => [
    R('1685', 3, 15),   // squat to overhead reach
    R('0662', 3, 10),   // push-up
    R('2300', 3, 8),    // inverted row, bent knees
    R('1460', 3, 12),   // walking lunge
    R('3013', 3, 15),   // low glute bridge
    R('0276', 3, 12)    // dead bug
  ] },
  { key: 'stretch', name: 'Home Stretch & Mobility', emoji: 'stretch', ex: () => [
    T('1604', 2, 40),   // world's greatest stretch
    T('1363', 2, 30),   // spine stretch
    T('1362', 2, 30),   // sphinx
    T('1346', 2, 30),   // kneeling lat stretch
    T('1424', 2, 30),   // seated glute stretch
    T('1418', 2, 30)    // hug knees to chest
  ] }
]

// Suggested week (0 = Sunday): one area a day, a lighter finish. Only fills empty days.
export const HOME_WEEK = { 1: 'legs', 2: 'push', 3: 'back', 4: 'core', 5: 'arms', 6: 'cardio', 0: 'stretch' }

// Fresh routine objects (new ids), each tagged with its `key` so the caller can map the week.
export const homeRoutines = () =>
  SPEC.map(({ key, name, emoji, ex }) => ({ key, r: { id: uid(), name, emoji, ex: ex() } }))
