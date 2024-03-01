'use client'

import React, {
	useState,
	useRef,
	useEffect,
    MouseEvent,
} from 'react'

// based
enum Gender {
		Male = 'Male',
		Female = 'Female',
}

enum Exercise {
		None = 'None',
		Light = 'Light',
		Moderate = 'Moderate',
		Heavy = 'Heavy',
		VHeavy = 'VHeavy',
}

const bmrModLookup = new Map([
		[Gender.Male, 5],
		[Gender.Female, -161],
])

const tdeeModLookup = new Map([
		[Exercise.None, 1.2],
		[Exercise.Light, 1.375],
		[Exercise.Moderate, 1.55],
		[Exercise.Heavy, 1.725],
		[Exercise.VHeavy, 1.9],
])

const isGender = (val: string): val is Gender => val in Gender
const isExercise = (val: string): val is Exercise => val in Exercise

const Calculator = () => {
	const [gender, setGender] = useState(Gender.Male)
	const [exercise, setExercise] = useState(Exercise.Moderate)
	const clickSetGender = (ev: MouseEvent<HTMLInputElement>) => {
		const val = ev.currentTarget.value.trim()
		console.log({val})
		console.log({isGender: isGender(val), genders: Gender})
		if (!isGender(val)) return
		setGender(val)
    }

	const clickSetExercise = (ev: MouseEvent<HTMLInputElement>) => {
		const val = ev.currentTarget.value.trim()
		if (!isExercise(val)) return
		setExercise(val)
    }

	const [results, setResults] = useState({
		bmr: 0,
		tdee: 0,
		cut: {
			20: 0, 15: 0, 10: 0,
		},
		bulk: {
			20: 0, 15: 0, 10: 0,
		},
	})

	const ageRef = useRef<HTMLInputElement>(null)
	const heightRef = useRef<HTMLInputElement>(null)
	const weightRef = useRef<HTMLInputElement>(null)

	function calculate() {
	console.log({ageRef, heightRef, weightRef})
		if (!ageRef.current || !heightRef.current || !weightRef.current) return
		const tdeeMod = tdeeModLookup.get(exercise)
		const bmrMod = bmrModLookup.get(gender)
		 
		 console.log({tdeeMod, bmrMod})

		if (!tdeeMod || !bmrMod) return

		const weight = parseInt(weightRef.current.value, 10)
		const height = parseInt(heightRef.current.value, 10)
		const age = parseInt(ageRef.current.value, 10)

		const bmr = (10 * weight) + (6.25 * height) - (4.92 * age) + bmrMod
		const tdee = bmr * tdeeMod

		setResults({
			bmr,
			tdee,
			cut: {
				20: tdee * 0.8, 15: tdee * 0.85, 10: tdee * 0.9,
			},
			bulk: {
				20: tdee * 1.2, 15: tdee * 1.15, 10: tdee * 1.1,
			},
		})
	}

	useEffect(calculate, [gender, exercise, ageRef, heightRef, weightRef])

	return (
		<section className="mb-4">
			<div className="flex flex-col sm:flex-row">
				<div>
					<div>
						<h2 className="pt-4 text-2xl">Biological Gender</h2>
						<div className="grid grid-rows-2 gap-2">
							<label>
								<input className="mr-2" defaultChecked type="radio" name="gender" value="Male" onClick={clickSetGender} />
								Male
							</label>
							<label>
								<input className="mr-2" type="radio" name="gender" value="Female" onClick={clickSetGender} />
								Female
							</label>
						</div>
					</div>
					<div>
						<h2 className="pt-4 text-2xl">Daily Exercise</h2>

						<div className="grid gap-2">
							<label>
								<input className="mr-2" type="radio" name="exercise" value="None" onClick={clickSetExercise} />
								No Exercise
							</label>
							<label>
								<input className="mr-2" type="radio" name="exercise" value="Light" onClick={clickSetExercise} />
								Light Exercise (1-3 days, weekly)
							</label>
							<label>
								<input defaultChecked className="mr-2" type="radio" name="exercise" value="Moderate" onClick={clickSetExercise} />
								Moderate Exercise (3-5 days, weekly)
							</label>
							<label>
								<input className="mr-2" type="radio" name="exercise" value="Heavy" onClick={clickSetExercise} />
								Very Active (6-7 days, weekly)
							</label>
							<label>
								<input className="mr-2" type="radio" name="exercise" value="VHeavy" onClick={clickSetExercise} />
								Very Very Active (multiple times a day)
							</label>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<h2 className="pt-4 text-2xl">Your Details</h2>
					<label className="my-1">
						<p className="inline">Weight (kg)</p>
						<input className="py-0.5 px-1 ml-2 w-36 rounded-md border-2 border-blue-500" ref={weightRef} onChange={calculate} defaultValue="85" type="number" />
					</label>
					<label className="my-1">
						<p className="inline">Height (cm)</p>
						<input className="py-0.5 px-1 ml-2 w-36 rounded-md border-2 border-blue-500" ref={heightRef} onChange={calculate} defaultValue="180" type="number" />
					</label>
					<label className="my-1">
						<p className="inline">Age (years)</p>
						<input className="py-0.5 px-1 ml-2 w-36 rounded-md border-2 border-blue-500" ref={ageRef} onChange={calculate} defaultValue="25" type="number" />
					</label>
				</div>
			</div>
			<div>
				<h2 className="pt-4 text-2xl">Results</h2>
				<p><strong>BMR: </strong> {~~results.bmr}</p>
				<p><strong>TDEE: </strong> {~~results.tdee}</p>
				<div className="flex pt-2">
					<div className="pr-8">
						<p><strong>Calories to cut </strong></p>
						<ul>
							<li><strong>10%: </strong>{~~results.cut[10]}</li>
							<li><strong>15%: </strong>{~~results.cut[15]}</li>
							<li><strong>20%: </strong>{~~results.cut[20]}</li>
						</ul>
					</div>
					<div>
						<p><strong>Calories to bulk </strong></p>
						<ul>
							<li><strong>10%: </strong>{~~results.bulk[10]}</li>
							<li><strong>15%: </strong>{~~results.bulk[15]}</li>
							<li><strong>20%: </strong>{~~results.bulk[20]}</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Calculator
