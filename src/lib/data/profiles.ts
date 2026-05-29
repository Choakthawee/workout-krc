export type ProfileKey = 'karn' | 'rc';
export type ProfilePath = '/karn' | '/rc';

export type WeekdayId =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday';

export type TableRow = {
	id: string;
	cells: string[];
};

export type ProgramBlock =
	| {
			kind: 'callout';
			tone: 'note' | 'danger' | 'success';
			title?: string;
			text: string;
	  }
	| {
			kind: 'day-title';
			text: string;
	  }
	| {
			kind: 'list';
			items: string[];
	  }
	| {
			kind: 'paragraph';
			text: string;
	  }
	| {
			kind: 'pills';
			intro: string;
			items: string[];
	  }
	| {
			kind: 'subheading';
			title: string;
	  }
	| {
			kind: 'table';
			headers: string[];
			rows: TableRow[];
	  };

export type ProgramSection = {
	id: string;
	title: string;
	collapsible?: boolean;
	defaultCollapsed?: boolean;
	blocks: ProgramBlock[];
};

export type ProfileStat = {
	label: string;
	value: string;
};

export type Session = {
	id: string;
	title: string;
	detail: string;
	minutes: number;
	intensity: string;
	complete: boolean;
	color: string;
};

export type WorkoutDay = {
	id: WeekdayId;
	label: string;
	shortLabel: string;
	title: string;
	summary: string;
	duration: string;
	intensity: string;
	type: 'training' | 'recovery' | 'rest';
	color: string;
	focus: string[];
	blocks: ProgramBlock[];
};

export type ProfileProgram = {
	key: ProfileKey;
	path: ProfilePath;
	name: string;
	handle: string;
	avatar: string;
	badge: string;
	title: string;
	headline: string;
	intro: string;
	accent: string;
	soft: string;
	cover: string;
	streak: number;
	energy: string;
	stats: ProfileStat[];
	sessions: Session[];
	days: WorkoutDay[];
	sections: ProgramSection[];
	footer: string;
};

const row = (id: string, cells: string[]): TableRow => ({ id, cells });

const noWalkChoices: ProgramBlock = {
	kind: 'table',
	headers: ['ตัวเลือก', 'ปริมาณ', 'เหมาะเมื่อไหร่', 'ห้ามทำอะไร'],
	rows: [
		row('rope-light', [
			'Battle Rope เบา',
			'8-10 รอบ: 15-20 วิทำ / 60-75 วิพัก',
			'อยากเหงื่อออกแต่ไม่อยากเดิน',
			'ห้าม slams หนัก'
		]),
		row('kb-swing-light', [
			'KB Swing เบา',
			'6-8 เซต x 10-15 ครั้ง',
			'อยากเผาผลาญและใช้สะโพก',
			'ห้ามทำจนหลังล้า'
		]),
		row('mobility-core', [
			'Mobility + Core',
			'10-15 นาที',
			'เมื่อยมาก / อยากฟื้นตัว',
			'ห้ามเอา core จนปวดหลัง'
		]),
		row('shadow-boxing', [
			'Shadow Boxing',
			'8 รอบ: 30 วิทำ / 30 วิพัก',
			'เบื่ออุปกรณ์',
			'ห้ามใส่แรงเต็มจนไหล่ล้า'
		])
	]
};

const karnDays: WorkoutDay[] = [
	{
		id: 'monday',
		label: 'วันจันทร์',
		shortLabel: 'Push',
		title: 'Day 1 - Push + ไหล่',
		summary: 'อก ไหล่หน้า ไหล่กลาง และไตรเซ็ปส์ ใช้ straight sets และเหลือแรง 2 ครั้ง',
		duration: '55-70 นาที',
		intensity: 'RIR 2',
		type: 'training',
		color: '#f56040',
		focus: ['อก', 'ไหล่', 'ไตรเซ็ปส์', 'core'],
		blocks: [
			{ kind: 'day-title', text: 'พักท่าหลัก 90-120 วิ / ท่าแยก 45-75 วิ' },
			{
				kind: 'table',
				headers: ['ท่า', 'เซต x ครั้ง', 'น้ำหนักเริ่มต้น', 'ได้ส่วนไหน', 'คิวฟอร์ม'],
				rows: [
					row('k-mon-bench', [
						'DB Bench Press',
						'3 x 8-12',
						'10-14 กก./ข้าง',
						'อก, ไหล่หน้า, ไตรเซ็ปส์',
						'สะบักบีบลง ข้อมือเหนือศอก'
					]),
					row('k-mon-press', [
						'Seated DB Shoulder Press',
						'3 x 8-10',
						'6-10 กก./ข้าง',
						'ไหล่หน้า, ไหล่กลาง',
						'เกร็งท้อง ไม่แอ่นหลัง'
					]),
					row('k-mon-pushup', [
						'Incline Push-up / Push-up',
						'3 x 8-15',
						'น้ำหนักตัว',
						'อก, ไตรเซ็ปส์, core',
						'ตัวตรง ศอกเฉียง 30-45 องศา'
					]),
					row('k-mon-lateral', [
						'DB Lateral Raise',
						'4 x 12-20',
						'3-5 กก./ข้าง',
						'ไหล่กลาง',
						'นำด้วยศอก ไม่เหวี่ยง'
					]),
					row('k-mon-triceps', [
						'Overhead Triceps Extension',
						'3 x 10-15',
						'10-14 กก. รวม',
						'ไตรเซ็ปส์',
						'ศอกไม่กางมาก'
					]),
					row('k-mon-rope', [
						'Optional Rope Finisher',
						'4 รอบ',
						'15 วิทำ / 60 วิพัก',
						'cardio เบา',
						'ใส่เฉพาะวันที่ยังสด'
					])
				]
			}
		]
	},
	{
		id: 'tuesday',
		label: 'วันอังคาร',
		shortLabel: 'Lower',
		title: 'Day 2 - Lower + Core',
		summary: 'ใช้กล้ามใหญ่เพื่อช่วยเผาผลาญและเพิ่มความแน่นของหุ่น',
		duration: '55-70 นาที',
		intensity: 'หนักกลาง',
		type: 'training',
		color: '#fd1d1d',
		focus: ['ขา', 'ก้น', 'หลังขา', 'core'],
		blocks: [
			{ kind: 'day-title', text: 'วันนี้ไม่ต้องเติม cardio เพิ่ม ให้แรงไปกับขาและ core' },
			{
				kind: 'table',
				headers: ['ท่า', 'เซต x ครั้ง', 'น้ำหนักเริ่มต้น', 'ได้ส่วนไหน', 'คิวฟอร์ม'],
				rows: [
					row('k-tue-squat', [
						'Goblet Squat',
						'4 x 8-12',
						'16-24 กก. รวม',
						'ต้นขา, ก้น, core',
						'เข่าตามปลายเท้า อกเปิด'
					]),
					row('k-tue-rdl', [
						'DB Romanian Deadlift',
						'4 x 8-12',
						'12-18 กก./ข้าง',
						'หลังขา, ก้น, หลังล่าง',
						'ดันสะโพกไปหลัง หลังตรง'
					]),
					row('k-tue-bulgarian', [
						'Bulgarian Split Squat',
						'3 x 8-10/ข้าง',
						'น้ำหนักตัว หรือ 4-8 กก./ข้าง',
						'ก้น, ต้นขา',
						'เข่าหน้าไม่ล้มเข้าใน'
					]),
					row('k-tue-calf', [
						'Standing Calf Raise',
						'3 x 12-20',
						'10-16 กก./ข้าง',
						'น่อง',
						'ขึ้นสุด ค้าง 1 วิ ลงช้า'
					]),
					row('k-tue-carry', [
						'Suitcase Carry',
						'3 x 30-45 วิ/ข้าง',
						'14-22 กก. ข้างเดียว',
						'เอวข้าง, core',
						'ตัวตรง ไม่เอียง'
					]),
					row('k-tue-crunch', [
						'Reverse Crunch',
						'3 x 10-15',
						'น้ำหนักตัว',
						'หน้าท้องล่าง',
						'ม้วนเชิงกราน ไม่เหวี่ยงขา'
					])
				]
			}
		]
	},
	{
		id: 'wednesday',
		label: 'วันพุธ',
		shortLabel: 'Recover',
		title: 'Recovery Day - No Walk',
		summary: 'เลือก 1 แบบเท่านั้น เพื่อให้ร่างกายฟื้น ไม่ใช่สะสมความล้า',
		duration: '20-30 นาที',
		intensity: '5-6/10',
		type: 'recovery',
		color: '#c13584',
		focus: ['ฟื้นตัว', 'เหงื่อเบา', 'mobility'],
		blocks: [
			noWalkChoices,
			{
				kind: 'callout',
				tone: 'danger',
				title: 'กฎสำคัญ',
				text: 'วัน Recovery ห้ามเปลี่ยนเป็น HIIT หนัก เพราะเป้าคือฟื้นตัวเพื่อสร้างกล้าม ไม่ใช่ทำให้พรุ่งนี้ยกแย่ลง'
			}
		]
	},
	{
		id: 'thursday',
		label: 'วันพฤหัสบดี',
		shortLabel: 'Pull',
		title: 'Day 3 - Pull + Rear Delts',
		summary: 'หลัง ปีก ไบเซ็ปส์ และหลังไหล่ เพื่อให้ทรงตัวดู V-shape มากขึ้น',
		duration: '55-70 นาที',
		intensity: 'RIR 2',
		type: 'training',
		color: '#405de6',
		focus: ['หลัง', 'ปีก', 'ไบเซ็ปส์', 'หลังไหล่'],
		blocks: [
			{ kind: 'day-title', text: 'เน้นดึงด้วยหลัง ไม่ใช่ยักคอหรือแกว่งตัว' },
			{
				kind: 'table',
				headers: ['ท่า', 'เซต x ครั้ง', 'น้ำหนักเริ่มต้น', 'ได้ส่วนไหน', 'คิวฟอร์ม'],
				rows: [
					row('k-thu-row', [
						'One-arm DB Row',
						'4 x 8-12/ข้าง',
						'14-22 กก.',
						'ปีก, หลังกลาง, ไบเซ็ปส์',
						'ดึงศอกไปสะโพก ไม่หมุนตัว'
					]),
					row('k-thu-supported-row', [
						'Chest-supported DB Row',
						'3 x 10-12',
						'10-16 กก./ข้าง',
						'หลังกลาง, สะบัก',
						'บีบสะบักด้านบน'
					]),
					row('k-thu-pullover', [
						'DB Pullover',
						'3 x 10-15',
						'10-16 กก. รวม',
						'ปีก, อกส่วนบน',
						'เก็บซี่โครง ดึงด้วยปีก'
					]),
					row('k-thu-reverse-fly', [
						'DB Reverse Fly',
						'3 x 12-20',
						'3-5 กก./ข้าง',
						'หลังไหล่, upper back',
						'ไม่ยักไหล่'
					]),
					row('k-thu-curl', [
						'Hammer Curl',
						'3 x 10-12',
						'6-10 กก./ข้าง',
						'ไบเซ็ปส์, ปลายแขน',
						'ศอกนิ่ง ไม่โยกหลัง'
					]),
					row('k-thu-side-plank', [
						'Side Plank',
						'3 x 25-40 วิ/ข้าง',
						'น้ำหนักตัว',
						'เอวข้าง, core',
						'สะโพกไม่ตก'
					])
				]
			}
		]
	},
	{
		id: 'friday',
		label: 'วันศุกร์',
		shortLabel: 'Reset',
		title: 'Active Recovery แบบไม่เดิน',
		summary: 'ไม่เล่นไหล่หรืออกหนัก ใช้ rope เบา + mobility + plank พอ',
		duration: '20-25 นาที',
		intensity: 'เบา',
		type: 'recovery',
		color: '#fcb045',
		focus: ['rope เบา', 'mobility', 'plank'],
		blocks: [
			{ kind: 'day-title', text: 'เป้าหมายคือฟื้นตัว ไม่ใช่ซ้อมเพิ่ม' },
			{
				kind: 'table',
				headers: ['ลำดับ', 'ทำอะไร', 'ปริมาณ', 'ความหนัก', 'หมายเหตุ'],
				rows: [
					row('k-fri-rope', [
						'1',
						'Battle Rope Alternating Waves',
						'8 รอบ: 20 วิทำ / 60 วิพัก',
						'5-6/10',
						'ห้าม slams หนัก ห้าม squat jump วันนี้'
					]),
					row('k-fri-mobility', [
						'2',
						'Mobility Flow',
						'8-10 นาที',
						'เบา',
						'ยืดอก ไหล่ สะโพก หลังขา'
					]),
					row('k-fri-plank', [
						'3',
						'Plank',
						'2 x 30-40 วิ',
						'เบา-กลาง',
						'บีบก้น เกร็งท้อง หลังไม่แอ่น'
					])
				]
			}
		]
	},
	{
		id: 'saturday',
		label: 'วันเสาร์',
		shortLabel: 'Full',
		title: 'Day 4 - Full Body + Conditioning',
		summary: 'วันเผาผลาญแบบไม่เดิน แต่ยังรักษากล้ามและคุณภาพท่า',
		duration: '50-65 นาที',
		intensity: '7/10',
		type: 'training',
		color: '#833ab4',
		focus: ['full body', 'conditioning', 'battle rope'],
		blocks: [
			{ kind: 'day-title', text: 'ใช้น้ำหนักเบากว่าวันหลักได้ แล้วปิดด้วย rope แบบคุมแรง' },
			{
				kind: 'table',
				headers: ['ท่า', 'เซต x ครั้ง', 'น้ำหนักเริ่มต้น', 'ได้ส่วนไหน', 'คิวฟอร์ม'],
				rows: [
					row('k-sat-squat', [
						'Goblet Squat / DB Front Squat',
						'3 x 10-12',
						'18-26 กก. รวม',
						'ขา, ก้น, core',
						'ลงคุม 2 วิ'
					]),
					row('k-sat-bench', [
						'DB Bench Press',
						'3 x 10-12',
						'10-14 กก./ข้าง',
						'อก, ไตรเซ็ปส์',
						'ใช้น้ำหนักเบากว่า Day 1 ได้'
					]),
					row('k-sat-rdl', [
						'DB Romanian Deadlift',
						'3 x 10',
						'12-18 กก./ข้าง',
						'หลังขา, ก้น',
						'หลังตรง ไม่ฝืนลึก'
					]),
					row('k-sat-arnold', [
						'DB Arnold Press',
						'3 x 10-12',
						'5-8 กก./ข้าง',
						'หัวไหล่รวม',
						'หมุนคุม ไม่กระแทก'
					]),
					row('k-sat-rope', [
						'Battle Rope Alternating Waves',
						'8-10 รอบ',
						'20 วิทำ / 40 วิพัก',
						'หัวใจ, ไหล่, core',
						'จบแล้วเหนื่อย 7/10 พอ'
					]),
					row('k-sat-climber', [
						'Mountain Climber ช้า',
						'3 x 20-30 ครั้ง',
						'น้ำหนักตัว',
						'หน้าท้อง, สะโพก',
						'หลังนิ่ง ไม่เด้งสะโพก'
					])
				]
			}
		]
	},
	{
		id: 'sunday',
		label: 'วันอาทิตย์',
		shortLabel: 'Rest',
		title: 'พักจริง',
		summary: 'นอน กิน เตรียมอาหาร และปล่อยให้ร่างกายเอางานทั้งสัปดาห์ไปสร้างผลลัพธ์',
		duration: '0-10 นาที',
		intensity: 'พัก',
		type: 'rest',
		color: '#36d1dc',
		focus: ['sleep', 'meal prep', 'reset'],
		blocks: [
			{
				kind: 'list',
				items: [
					'พักเต็มที่ ไม่ต้องทำ conditioning',
					'ถ้าเมื่อยมาก ทำ mobility เบา 10 นาทีได้',
					'เตรียมโปรตีนและอาหารสำหรับจันทร์',
					'ดูค่าเฉลี่ยน้ำหนักและรอบเอว ไม่ตัดสินจากวันเดียว'
				]
			}
		]
	}
];

const rcDays: WorkoutDay[] = [
	{
		id: 'monday',
		label: 'วันจันทร์',
		shortLabel: 'Walk',
		title: 'เดินเบาหลังอาหาร',
		summary: 'เริ่มสัปดาห์ด้วยการเดินสะสมแบบไม่กดก้นกบ',
		duration: '15-30 นาที',
		intensity: 'เบา',
		type: 'recovery',
		color: '#36d1dc',
		focus: ['เดิน', 'fat loss', 'low impact'],
		blocks: [
			{
				kind: 'callout',
				tone: 'success',
				text: 'ถ้าวันธรรมดายุ่ง ให้ทำแค่เดิน 10-15 นาทีหลังอาหารเย็นก็ยังดี'
			},
			{
				kind: 'list',
				items: [
					'เดินเบา ๆ หลังอาหาร หรือเดินสะสมระหว่างวัน',
					'เป้าคือเพิ่มการใช้พลังงาน ไม่ใช่ทำให้ล้า',
					'ถ้าก้นกบเริ่มกดหรือปวด ให้หยุดพักและเปลี่ยนอิริยาบถ'
				]
			}
		]
	},
	{
		id: 'tuesday',
		label: 'วันอังคาร',
		shortLabel: 'Steps',
		title: 'เดินสะสม + ยืดสะโพก',
		summary: 'เก็บก้าวเพิ่มแบบสบาย ๆ แล้วคลายสะโพกก่อนนอน',
		duration: '15-25 นาที',
		intensity: 'เบา',
		type: 'recovery',
		color: '#4fb7e5',
		focus: ['steps', 'mobility', 'hips'],
		blocks: [
			{
				kind: 'table',
				headers: ['ทำอะไร', 'เวลา', 'คำแนะนำ'],
				rows: [
					row('r-tue-walk', ['เดินเบา', '10-20 นาที', 'เดินหลังอาหารหรือแบ่งช่วงเช้า/เย็น']),
					row('r-tue-mobility', ['Mobility เบา', '5 นาที', 'เปิดสะโพก ยืดหลังขา ไม่นั่งพื้นนาน'])
				]
			}
		]
	},
	{
		id: 'wednesday',
		label: 'วันพุธ',
		shortLabel: 'Reset',
		title: 'Recovery กลางสัปดาห์',
		summary: 'เช็กอาการก้นกบและลดความล้าก่อนเข้าช่วงปลายสัปดาห์',
		duration: '10-20 นาที',
		intensity: 'เบามาก',
		type: 'recovery',
		color: '#5b86e5',
		focus: ['recovery', 'posture', 'breathing'],
		blocks: [
			{
				kind: 'list',
				items: [
					'เดินเบาหรือยืนขยับตัวระหว่างวัน',
					'หายใจช้า ๆ 3-5 นาที เพื่อลดความเครียด',
					'ถ้ามีปวดแปลบ ชา หรือร้าวลงขา ให้พักและปรึกษาผู้เชี่ยวชาญ'
				]
			}
		]
	},
	{
		id: 'thursday',
		label: 'วันพฤหัสบดี',
		shortLabel: 'Walk',
		title: 'เดินเบา + เตรียมแรง',
		summary: 'ทำให้เลือดไหลเวียนดี แต่ไม่ทำให้เสาร์หมดแรง',
		duration: '15-30 นาที',
		intensity: 'เบา',
		type: 'recovery',
		color: '#7b7ee8',
		focus: ['เดิน', 'energy', 'prep'],
		blocks: [
			{
				kind: 'callout',
				tone: 'note',
				text: 'วันนี้ควรจบแบบรู้สึกสดขึ้น ไม่ใช่เหนื่อยสะสม'
			},
			{
				kind: 'list',
				items: ['เดินหลังอาหารเย็น 15-20 นาที', 'ดื่มน้ำให้พอ', 'เลี่ยงนั่งนานติดกันหลายชั่วโมง']
			}
		]
	},
	{
		id: 'friday',
		label: 'วันศุกร์',
		shortLabel: 'Prep',
		title: 'เตรียมซ้อมเสาร์',
		summary: 'เดินเบา กินโปรตีน และนอนให้พร้อมสำหรับ workout หลัก',
		duration: '10-20 นาที',
		intensity: 'เบา',
		type: 'recovery',
		color: '#b672d8',
		focus: ['prep', 'protein', 'sleep'],
		blocks: [
			{
				kind: 'list',
				items: [
					'เดินหรือยืดเบา ๆ 10-20 นาที',
					'เช็กอุปกรณ์: kettlebell, dumbbell, battle ropes, เก้าอี้',
					'เข้านอนให้พอเพื่อให้เสาร์ไม่ล้า'
				]
			}
		]
	},
	{
		id: 'saturday',
		label: 'วันเสาร์',
		shortLabel: 'Full',
		title: 'Full Body Strength + Rope',
		summary: 'ฝึกทั้งตัว สร้างกล้ามเนื้อ และเผาผลาญแบบปลอดภัย',
		duration: '45-60 นาที',
		intensity: '6-7/10',
		type: 'training',
		color: '#f56040',
		focus: ['full body', 'rope', 'strength'],
		blocks: [
			{ kind: 'day-title', text: 'Warm-up 8-10 นาที แล้วเล่นท่าหลักแบบเหลือแรง 2-3 ครั้ง' },
			{
				kind: 'table',
				headers: ['ลำดับ', 'ท่า', 'เซต x ครั้ง', 'อุปกรณ์ / น้ำหนักแนะนำ', 'โฟกัส'],
				rows: [
					row('r-sat-goblet', [
						'1',
						'Goblet Squat',
						'3 x 8-10',
						'KB 6-8 kg หรือ DB 6-10 kg',
						'ต้นขา ก้น แกนกลาง'
					]),
					row('r-sat-rdl', [
						'2',
						'Dumbbell Romanian Deadlift',
						'3 x 8-10',
						'ดัมเบลคู่ 5-10 kg ต่อข้าง',
						'ก้น หลังขา หลังล่างแบบปลอดภัย'
					]),
					row('r-sat-press', [
						'3',
						'Incline Dumbbell Press หรือ Floor Press',
						'3 x 8-12',
						'ดัมเบลคู่ 3-7.5 kg ต่อข้าง',
						'อก ไหล่ หลังแขน'
					]),
					row('r-sat-row', [
						'4',
						'One-arm Dumbbell Row',
						'3 x 10/ข้าง',
						'ดัมเบล 6-12.5 kg',
						'หลัง ปีก แขนหน้า'
					]),
					row('r-sat-antirotation', [
						'5',
						'Standing Dumbbell Anti-Rotation Press',
						'3 x 8-10/ข้าง',
						'ดัมเบล 3-6 kg ถือสองมือ',
						'core ลึก ไม่กดก้นกบ'
					]),
					row('r-sat-rope', [
						'6',
						'Battle Rope Alternating Waves',
						'6 รอบ: 15 วิทำ / 45 วิพัก',
						'rope เบา',
						'หัวใจเต้นแรงขึ้น แต่ไม่หน้ามืด'
					])
				]
			}
		]
	},
	{
		id: 'sunday',
		label: 'วันอาทิตย์',
		shortLabel: 'Lower',
		title: 'Lower Body + Standing Core',
		summary: 'เน้นก้น ขา แกนกลาง และ conditioning แบบ low impact',
		duration: '45-60 นาที',
		intensity: '6-7/10',
		type: 'training',
		color: '#fcb045',
		focus: ['lower body', 'standing core', 'low impact'],
		blocks: [
			{ kind: 'day-title', text: 'เลี่ยงท่านอนกดก้นกบ ใช้ core แบบยืนเป็นหลัก' },
			{
				kind: 'table',
				headers: ['ลำดับ', 'ท่า', 'เซต x ครั้ง', 'อุปกรณ์ / น้ำหนักแนะนำ', 'โฟกัส'],
				rows: [
					row('r-sun-box-squat', [
						'1',
						'Box Squat หรือ Chair Squat',
						'3 x 10',
						'น้ำหนักตัวก่อน ถ้าง่ายใช้ KB 6 kg',
						'ขา ก้น ลดแรงกดเข่า'
					]),
					row('r-sun-rdl', [
						'2',
						'Dumbbell Romanian Deadlift',
						'3 x 10',
						'ดัมเบลคู่ 5-10 kg ต่อข้าง',
						'ก้น หลังขา'
					]),
					row('r-sun-step', [
						'3',
						'Step-up Low Box',
						'2 x 8/ข้าง',
						'น้ำหนักตัวก่อน',
						'ขา ก้น สมดุลร่างกาย'
					]),
					row('r-sun-carry', [
						'4',
						'Farmer Carry',
						'4 รอบ x 20-30 เมตร',
						'ดัมเบลคู่ 6-12.5 kg',
						'เผาผลาญ จับถือ แกนกลาง'
					]),
					row('r-sun-suitcase', [
						'5',
						'Standing Suitcase Hold',
						'3 x 20-30 วิ/ข้าง',
						'ดัมเบล 6-12.5 kg ถือข้างเดียว',
						'เอว แกนกลาง ไม่ต้องนอน'
					]),
					row('r-sun-rope', [
						'6',
						'Battle Rope Slams เบา ๆ',
						'5 รอบ: 10 วิทำ / 50 วิพัก',
						'rope เบา',
						'ใช้แรงจากสะโพก ไม่ยกไหล่เกร็ง'
					])
				]
			}
		]
	}
];

const karnSections: ProgramSection[] = [
	{
		id: 'karn-weight-rules',
		title: 'กฎเลือกน้ำหนัก',
		collapsible: true,
		defaultCollapsed: true,
		blocks: [
			{
				kind: 'callout',
				tone: 'note',
				title: 'RIR 2',
				text: 'ทุกเซตควรจบแบบยังเหลือแรงทำได้อีกประมาณ 2 ครั้ง ถ้าฟอร์มพังให้ลดน้ำหนักทันที'
			},
			{
				kind: 'callout',
				tone: 'success',
				text: 'ทำครบ reps บนสุดทุกเซต + ฟอร์มสวย -> ครั้งหน้าเพิ่ม 2 กก./ข้าง สำหรับท่าหลัก'
			},
			{
				kind: 'callout',
				tone: 'note',
				title: 'ท่าไหล่เล็กอย่ารีบเพิ่ม',
				text: 'Lateral raise / reverse fly ให้เพิ่ม reps ก่อนเพิ่มน้ำหนัก เพราะกล้ามเล็กและข้อไหล่ล้าง่าย'
			}
		]
	}
];

const rcSections: ProgramSection[] = [
	{
		id: 'rc-rules',
		title: 'กฎสำคัญก่อนเริ่ม',
		collapsible: true,
		defaultCollapsed: true,
		blocks: [
			{
				kind: 'callout',
				tone: 'note',
				title: 'ระดับความเหนื่อยที่ต้องการ',
				text: 'ประมาณ 6-7/10 คือเหนื่อย แต่ยังคุมท่าได้ ไม่หน้ามืด ไม่เจ็บข้อ ไม่หอบจนพูดไม่ได้'
			},
			{
				kind: 'callout',
				tone: 'danger',
				title: 'สำคัญสำหรับปัญหาก้นกบ',
				text: 'ถ้าท่าไหนทำแล้วเจ็บก้นกบ เจ็บแปลบ หรือรู้สึกกดทับบริเวณก้นกบ ให้หยุดทันที'
			},
			{
				kind: 'list',
				items: [
					'ทุกท่าต้องเหลือแรงอีกประมาณ 2-3 ครั้ง ไม่ฝืนจนหมดแรง',
					'พักระหว่างเซต 60-90 วินาที',
					'น้ำหนักดัมเบลควรเป็นน้ำหนักที่ทำครบจำนวนครั้งได้ แต่ 2 ครั้งท้ายเริ่มยาก',
					'เป้าหมาย 4 สัปดาห์แรกคือสร้างนิสัย + ท่าถูก + ไม่เจ็บ'
				]
			}
		]
	},
	{
		id: 'rc-starting-loads',
		title: 'น้ำหนักที่ควรเริ่มใช้',
		collapsible: true,
		defaultCollapsed: true,
		blocks: [
			{
				kind: 'table',
				headers: ['ประเภทท่า', 'น้ำหนักเริ่มต้น', 'สัญญาณว่าน้ำหนักพอดี'],
				rows: [
					row('r-load-squat', [
						'Squat / Goblet Squat',
						'KB 6 kg หรือ DB 6-10 kg',
						'ทำครบ 10 ครั้งได้ เข่าไม่เจ็บ หลังไม่งอ'
					]),
					row('r-load-deadlift', [
						'Deadlift / RDL',
						'DB คู่ 5-10 kg หรือ KB 8 kg',
						'รู้สึกหลังขาและก้น ไม่ใช่ปวดหลังล่าง'
					]),
					row('r-load-press', ['Press', 'DB คู่ 3-5 kg', 'ไหล่ไม่ยกเกร็ง คุมทางลงได้']),
					row('r-load-row', ['Row', 'DB 6-12.5 kg', 'ดึงแล้วรู้สึกหลัง ไม่ใช่คอหรือบ่า']),
					row('r-load-carry', [
						'Farmer Carry / Suitcase Hold',
						'DB 6-12.5 kg',
						'ยืนหรือเดินตัวตรงได้ ไม่เอียงซ้ายขวา'
					])
				]
			}
		]
	}
];

export const profiles: Record<ProfileKey, ProfileProgram> = {
	karn: {
		key: 'karn',
		path: '/karn',
		name: 'Karn',
		handle: '@karn.training',
		avatar: 'K',
		badge: 'Toji build',
		title: 'TOJI BUILD - NO WALK EDITION',
		headline: 'Lean down, build muscle, sharpen shoulders, and train without walking cardio.',
		intro:
			'เวอร์ชันแก้ไขสำหรับผู้ชาย 24 ปี / 73 กก. / 174 ซม. เป้าหมายลีนลง + มีกล้าม + ไหล่ชัด + six pack โดยตัดเดิน/จ็อกออก',
		accent: '#f56040',
		soft: '#fff3ec',
		cover: 'linear-gradient(135deg, #f77737 0%, #fd1d1d 46%, #833ab4 100%)',
		streak: 14,
		energy: 'Power',
		stats: [
			{ label: 'เป้าหมาย', value: 'Recomp' },
			{ label: 'ซ้อมหลัก', value: '4 วัน' },
			{ label: 'Cardio', value: 'No walk' }
		],
		sessions: [
			{
				id: 'k-push',
				title: 'Push + Shoulder',
				detail: 'อก ไหล่ ไตรเซ็ปส์ พร้อม rope เบาถ้ายังสด',
				minutes: 60,
				intensity: 'RIR 2',
				complete: true,
				color: '#f56040'
			},
			{
				id: 'k-lower',
				title: 'Lower + Core',
				detail: 'ขา ก้น หลังขา และ core แบบคุมฟอร์ม',
				minutes: 60,
				intensity: 'Medium',
				complete: false,
				color: '#fd1d1d'
			},
			{
				id: 'k-full',
				title: 'Full Body',
				detail: 'Full body + conditioning แบบไม่เดิน',
				minutes: 55,
				intensity: '7/10',
				complete: false,
				color: '#833ab4'
			}
		],
		days: karnDays,
		sections: karnSections,
		footer: 'TOJI BUILD - NO WALK EDITION - train hard, recover harder.'
	},
	rc: {
		key: 'rc',
		path: '/rc',
		name: 'RC',
		handle: '@rc.weekend',
		avatar: 'R',
		badge: 'Beginner fat loss',
		title: 'โปรแกรมลดไขมันสำหรับผู้หญิงเริ่มต้น',
		headline: 'Weekend training, tailbone-friendly movement, and weekday walking.',
		intro:
			'เหมาะสำหรับผู้หญิง อายุ 27 ปี น้ำหนัก 87 กก. สูง 161 ซม. ว่างออกกำลังกายหลักเฉพาะวันเสาร์และอาทิตย์ พร้อมของครบ',
		accent: '#00a5cf',
		soft: '#eefaff',
		cover: 'linear-gradient(135deg, #36d1dc 0%, #5b86e5 48%, #fcb045 100%)',
		streak: 9,
		energy: 'Flow',
		stats: [
			{ label: 'เป้าหมาย', value: 'ลดไขมัน' },
			{ label: 'ซ้อมหลัก', value: '2 วัน' },
			{ label: 'เวลา', value: '45-60m' }
		],
		sessions: [
			{
				id: 'r-walk',
				title: 'Weekday Walk',
				detail: 'เดินเบา ๆ หลังอาหาร หรือเดินสะสมระหว่างวัน',
				minutes: 20,
				intensity: 'Light',
				complete: true,
				color: '#36d1dc'
			},
			{
				id: 'r-sat',
				title: 'Saturday Full Body',
				detail: 'Full Body Strength + Battle Rope เบา',
				minutes: 50,
				intensity: '6-7/10',
				complete: false,
				color: '#f56040'
			},
			{
				id: 'r-sun',
				title: 'Sunday Lower + Core',
				detail: 'Lower Body + Standing Core + Conditioning',
				minutes: 50,
				intensity: 'Low impact',
				complete: false,
				color: '#fcb045'
			}
		],
		days: rcDays,
		sections: rcSections,
		footer:
			'Program designed for beginner fat loss, consistency, joint-friendly progression, and tailbone-friendly training.'
	}
};
