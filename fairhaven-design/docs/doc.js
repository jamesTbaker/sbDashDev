
// --- IMPORTS

import * as React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import * as Fh from 'fairhaven-design';
import styled from 'styled-components';
import {
	lh_title,
	mt3,
	mb1,
	mb3,
	pa4,
	fw3,
} from 'styled-components-mixins/tachyons';
import FhColorList from './components/Fh.ColorList';
import FhColorItem from './components/Fh.ColorItem';

const ibmColors = require('ibm-design-colors/ibm-colors.json');

// --- DOCUMENTATION

const ibmColorsObjectKeys = Object.keys(ibmColors);

const DocContainer = styled.main`
	${pa4}
`;
const DocTitle = styled.h1`
	${Fh.fs2}
	${lh_title}
	${mt3}
	${mb3}
	${fw3}
`;
const SectionContainer = styled.section`
	border-top: 1px solid ${Fh.ReturnColor('gray', 10)};
`;
const SectionTitle = styled.h2`
	${Fh.fs3}
	${lh_title}
	${mt3}
	${mb1}
	${fw3}
`;

const ColorItemHeader = styled.h3`
	${Fh.fs4}
	${lh_title}
	${mt3}
	${mb1}
	${fw3}
`;
const Doc = () => {
	Fh.baseStyles();
	return (
		<DocContainer>
			<DocTitle>Fairhaven Design System Demo</DocTitle>
			<SectionContainer>
				<SectionTitle>
					Color
				</SectionTitle>
				<ColorItemHeader>interactive</ColorItemHeader>
				<FhColorItem
					colorName="cerulean"
					colorGradeName="50"
				/>
				<FhColorItem
					colorName="cerulean"
					colorGradeName="60"
				/>
				{
					ibmColorsObjectKeys.map(colorListKey => (
						<FhColorList
							key={colorListKey}
							colorName={colorListKey}
							colorGrades={ibmColors[colorListKey]}
						/>
					))
				}
			</SectionContainer>
			<SectionContainer>
				<SectionTitle>
					Typography
				</SectionTitle>
				<Fh.H1>Make a Brew I Could Right Fancy</Fh.H1>
				<Fh.P>
					Pommy ipsum bit of a Jack the lad a diamond geezer sorted it man and his whippet, 
					fake tan wellies biscuits naff off.
				</Fh.P>
				<Fh.P>
					<Fh.BasicLink>Houlligan pigeons in Trafalgar</Fh.BasicLink> Square fancied 
					a flutter the old bill. Nigh what a mug teacakes the black death Prince Charles 
					collywobbles nuthouse, numpty Geordie absolute full English breakast I bid you good 
					day tally-ho bargain Betty.
				</Fh.P>
				<Fh.P>
					Big light bag egg&apos;s old boy on his bill 
					penny-dreadful &apos;ar kid. Up the duff the chippy wellies flabbergasted tosser 
					terribly give you a bell, picalilly shepherd&apos;s pie ey up chuck bloody shambles 
					cheesed off, flog a dead horse bent as a nine bob note red telephone box ey up duck 
					bent as a nine bob note.
				</Fh.P>
				<Fh.H2>A Double Dutch Chav Whizz Yorkshire Pudding</Fh.H2>
				<Fh.P>
					Pommy ipsum bit of a Jack the lad a diamond geezer sorted it man and his whippet,
					fake tan wellies biscuits naff off, houlligan pigeons in Trafalgar Square fancied
					a flutter the old bill.
				</Fh.P>
				<Fh.UlUnbulleted>
					<Fh.LiUnbulleted>Splendid pork</Fh.LiUnbulleted>
					<Fh.LiUnbulleted>
						Dripping on the pull it&apos;s nicked completely crackers, 
						accordingly down South ask your mother if chav utter shambles naff and thus
					</Fh.LiUnbulleted>
					<Fh.LiUnbulleted>
						Doofer bit of a div
						<Fh.UlUnbulletedNested>
							<Fh.LiUnbulletedNested>Wedding tackle</Fh.LiUnbulletedNested>
							<Fh.LiUnbulletedNested>
								Balderdash old chap pennyboy baffled ear hole Elementary my dear Watson 
								and we all like figgy pudding ridiculous squirrel the fuzz make a brew chips
							</Fh.LiUnbulletedNested>
							<Fh.LiUnbulletedNested>Chaps give you a bell mince pies</Fh.LiUnbulletedNested>
						</Fh.UlUnbulletedNested>
					</Fh.LiUnbulleted>
				</Fh.UlUnbulleted>
				<Fh.H3>Bow Ties are Cool</Fh.H3>
				<Fh.P>
					Pommy ipsum bit of a Jack the lad a diamond geezer sorted it man and his whippet,
					fake tan wellies biscuits naff off, houlligan pigeons in Trafalgar Square fancied
					a flutter the old bill.
				</Fh.P>
				<Fh.UlBulleted>
					<Fh.LiBulleted>Splendid pork</Fh.LiBulleted>
					<Fh.LiBulleted>
						Dripping on the pull it&apos;s nicked completely crackers,
						accordingly down South ask your mother if chav utter shambles naff and thus
					</Fh.LiBulleted>
					<Fh.LiBulleted>
						Doofer bit of a div
						<Fh.UlBulletedNested>
							<Fh.LiBulletedNested>Wedding tackle</Fh.LiBulletedNested>
							<Fh.LiBulletedNested>
								Balderdash old chap pennyboy baffled ear hole Elementary my dear Watson
								and we all like figgy pudding ridiculous squirrel the fuzz make a brew chips
							</Fh.LiBulletedNested>
							<Fh.LiBulletedNested>Chaps give you a bell mince pies</Fh.LiBulletedNested>
						</Fh.UlBulletedNested>
					</Fh.LiBulleted>
				</Fh.UlBulleted>
				<Fh.H4>Driving a Mini Ever So Superb</Fh.H4>
				<Fh.P>
					Pommy ipsum bit of a Jack the lad a diamond geezer sorted it man and his whippet,
					fake tan wellies biscuits naff off, houlligan pigeons in Trafalgar Square fancied
					a flutter the old bill. Nigh what a mug teacakes the black death Prince Charles
					collywobbles nuthouse, numpty Geordie absolute full English breakast I bid you good
					day tally-ho bargain Betty, big light bag egg&apos;s old boy on his bill
					penny-dreadful &apos;ar kid. Up the duff the chippy wellies flabbergasted tosser
					terribly give you a bell, picalilly shepherd&apos;s pie ey up chuck bloody shambles
					cheesed off, flog a dead horse bent as a nine bob note red telephone box ey up duck
					bent as a nine bob note.
				</Fh.P>
				<Fh.H5>We&apos;ll be &apos;avin Less of that Tallywhacker</Fh.H5>
				<Fh.P>
					Pommy ipsum bit of a Jack the lad a diamond geezer sorted it man and his whippet,
					fake tan wellies biscuits naff off, houlligan pigeons in Trafalgar Square fancied
					a flutter the old bill. Nigh what a mug teacakes the black death Prince Charles
					collywobbles nuthouse, numpty Geordie absolute full English breakast I bid you good
					day tally-ho bargain Betty, big light bag egg&apos;s old boy on his bill
					penny-dreadful &apos;ar kid. Up the duff the chippy wellies flabbergasted tosser
					terribly give you a bell, picalilly shepherd&apos;s pie ey up chuck bloody shambles
					cheesed off, flog a dead horse bent as a nine bob note red telephone box ey up duck
					bent as a nine bob note.
				</Fh.P>
				<Fh.H6>Chin up Old Chap Pigeons in Trafalgar Square</Fh.H6>
				<Fh.P>
					Pommy ipsum bit of a Jack the lad a diamond geezer sorted it man and his whippet,
					fake tan wellies biscuits naff off, houlligan pigeons in Trafalgar Square fancied
					a flutter the old bill. Nigh what a mug teacakes the black death Prince Charles
					collywobbles nuthouse, numpty Geordie absolute full English breakast I bid you good
					day tally-ho bargain Betty, big light bag egg&apos;s old boy on his bill
					penny-dreadful &apos;ar kid. Up the duff the chippy wellies flabbergasted tosser
					terribly give you a bell, picalilly shepherd&apos;s pie ey up chuck bloody shambles
					cheesed off, flog a dead horse bent as a nine bob note red telephone box ey up duck
					bent as a nine bob note.
				</Fh.P>
			</SectionContainer>
		</DocContainer>
	);
};

ReactDOM.render(<Doc />, document.getElementById('react-root'));
