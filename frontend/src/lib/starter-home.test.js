import { describe, it, expect } from 'vitest'
import { homeRoutines, HOME_WEEK } from './starter-home.js'
import { EXIDX, isHomeFriendly } from './exercises.js'

describe('home starter plan', () => {
  const list = homeRoutines()

  it('only uses real, equipment-free exercises', () => {
    for (const { r } of list) for (const e of r.ex) {
      expect(EXIDX[e.id], e.id).toBeTruthy()
      expect(EXIDX[e.id].eq).toBe('body weight')
    }
  })

  it('covers every day of the suggested week with an existing routine', () => {
    const keys = new Set(list.map(x => x.key))
    for (const d of [0, 1, 2, 3, 4, 5, 6]) expect(keys.has(HOME_WEEK[d])).toBe(true)
  })

  it('timed entries carry seconds, rep entries carry reps', () => {
    for (const { r } of list) for (const e of r.ex) {
      if (e.mode === 'time') expect(e.sec).toBeGreaterThan(0)
      else expect(e.reps).toBeGreaterThan(0)
    }
  })

  it('library filter drops bar and ring work but keeps floor work', () => {
    expect(isHomeFriendly({ n: 'push-up', eq: 'body weight' })).toBe(true)
    expect(isHomeFriendly({ n: 'ring dips', eq: 'body weight' })).toBe(false)
    expect(isHomeFriendly({ n: 'barbell curl', eq: 'barbell' })).toBe(false)
    expect(isHomeFriendly({ n: 'my own thing' })).toBe(true)
  })
})
