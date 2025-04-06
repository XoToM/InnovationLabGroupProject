'use client'

//import { ScrollView, View } from "@/app/components/Views";
import Image from 'next/image'
import { FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Switch } from '@mui/material';

let styles = {};
let accessibilityOptions = {"test_on":true,"test_off":false};

function SettingsScreen(){
	<> {/* the whole screen is scrollable */}
	  <header> {/*  style={styles.header} header */}
		<button> {/* style={styles.settingIcon} button with an icon. later should be linked to other pages */}
			<span>Home</span>{/*  <Image src="" alt=""/>name="home" size={28} */}
		</button>
		<h1>Settings</h1>
		<button> {/*  style={styles.settingIcon} button with an icon. later should be linked to other pages */}
			<span>Close</span>{/* <Image name="close" size={28} />*/}
		</button>
	  </header>

		<h1>Test</h1>
		<FormControl>
			<FormGroup>
				{
					Object.entries(accessibilityOptions).map(([key, value]) => ( /* this runs through every accessibility option */
						<FormControlLabel control={<Switch checked={value} />} label={key} />
					))
				}
			</FormGroup>
			
			{/*<FormGroup>
				<RadioGroup>
					<FormControlLabel value="Tol" control={<Radio />} label="Tol" />
					<FormControlLabel value="IBM" control={<Radio />} label="IBM" />
				</RadioGroup>
			</FormGroup>*/}

		</FormControl>
	  

	  {/*<section style={styles.section}>
		<button style={styles.settingIcon}>
		  <Image name="color-palette" size={24} />
		</button>
		<div style={styles.optionsContainer}>
		  {["Tol", "IBM"].map((palette) => ( /* out of two options listed run through them 
			<TouchableOpacity key={palette} style={styles.optionRow} onPress={() => setSelectedPalette(palette)}>
			  <Switch value={selectedPalette === palette} onValueChange={() => setSelectedPalette(palette)} />
			  <span style = {styles.sectionText}>{palette} color palette</span>
			</TouchableOpacity> //!!!in future it will use Async storage to save chosen settings!!!
		  ))}
		</div>
	  </section>
	  */}
	</>
}

export default SettingsScreen;