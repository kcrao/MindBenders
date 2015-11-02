/**
 MindBenders Reactt Native App
 * https://github.com/facebook/react-native
 */

'use strict';
var nBackAmount =0;
var audioSwitch = false;
var imageSwitch = false;
 var React = require('react-native');
 var {
   AppRegistry,
   AsyncStorage,
   StyleSheet,
   Image,
   Text,
   View,
   SliderIOS,
   NavigatorIOS,
   TouchableHighlight,
   SwitchIOS,
 } = React;


 var Dimensions = require('Dimensions');
 var windowSize = Dimensions.get('window');

 var BOX_REF = "BOX";
 var precomputeStyle = require('precomputeStyle');
 var TimerMixin = require('react-timer-mixin');
 //var UIExplorerButton = require('./UIExplorerButton');
 var arrayIndex = 0;
 var displayBlankImage = true;


 /* Access to external icon library */
 var Icon = require('react-native-vector-icons/MaterialIcons');


 /* Async Storage */

 var STORAGE_KEY = '@AsyncStorageMindBenders:key';
 var AUDIO_KEY = '@AsyncStorageMindBendersAudio:key';
 var IMAGE_KEY = '@AsyncStorageMindBendersImage:key';


/* Chunking randomizer variable setup BEGIN */
var imageMax = 7;

var idxRandomImage = Math.floor(Math.round((imageMax) * Math.random()));
var currenImageId = "";
var totalIntervals=0;
var gameRound= new Array();
var i=0;
var matchCounter=0;
var dbgString = "";
/* Chunking randomizer variable setup END */


/* Function definition for chunking and random array population BEGIN */



 /*var buttonImageArray = [
   require ('image!nBackSettings'),
   require ('image!nbackGridSettings'),
 ];

 var settingsIcon = [
   require ('image!settings'),
 ];
*/
 var logo= [
    require ('image!mindBenderLogo'),
 ]

 var logoIcon = logo[0];
// var settingsImage = settingsIcon[0];

// var nBackSettingsButton = buttonImageArray[0];
 //var nGridSettingsButton = buttonImageArray[1];

 //var blankImage = [require ('image!blank'),];


/* Pull in MindBender nBACK IMAGE GAME COMPONENT */
var MindBender = require ('./MindBender');

/* END Pull in MindBender nBACK IMAGE COMPONENT */


var SliderNumbers = React.createClass({

   render() {


       return (

         <View style={ {flex: 1}, {flexDirection: 'row'}, {paddingTop: 10},  {alignSelf: 'center'}, {alignItems: 'stretch'}, {justifyContent: 'space-around'}}>
           <Text>
             <Text style={{color: 'blue'}}>1 </Text>
             <Text style={{color: 'blue'}}>2  </Text>
             <Text style={{color: 'blue'}}>3  </Text>
             <Text style={{color: 'blue'}}>4  </Text>
             <Text style={{color: 'blue'}}>5  </Text>
             <Text style={{color: 'blue'}}>6  </Text>
             <Text style={{color: 'blue'}}>7  </Text>
             <Text style={{color: 'blue'}}>8  </Text>
             <Text style={{color: 'blue'}}>9  </Text>
             <Text style={{color: 'blue'}}>10  </Text>

            </Text>
          </View>
        );

   }


});

 var Slider = React.createClass({

   getInitialState() {
     this._loadInitialState().done();

     return {
       value: nBackAmount,
     };
   },

   componentDidMount () {
   this._loadInitialState().done();
 },


 async _loadInitialState() {
  try {
    nBackAmount = await AsyncStorage.getItem(STORAGE_KEY);
    if (nBackAmount !== null){
      this.setState({selectedValue: nBackAmount});
      console.log('Recovered selection from disk: ' + nBackAmount);
      nBackAmount = Number(nBackAmount);
    } else {
      console.log('Initialized with no selection on disk.');
      nBackAmount = 2;
    }
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }
},

  async _handleValueChanged(value) {
     nBackAmount = Math.round(value);


     this.setState({nBackAmount: nBackAmount});

     // save changed value in persistent storage

     try {
       await AsyncStorage.setItem(STORAGE_KEY, nBackAmount.toString());
      console.log('Saved selection to disk: ' + nBackAmount.toString());
         } catch (error) {
           this._appendMessage('AsyncStorage error: ' + error.message);
         }
    // end save changed value in persistent storage
     },

     render() {


       console.log('nbackAmount = ' + nBackAmount);

     return (

       <View style = {styles.sliderContainer}>

         <Text>
           {' Choose how many values to go back (1-10): '}
        </Text>
         <Text style={{textAlign: 'center'}}>
           {'\n Match back: '}
           {nBackAmount}
           {' back'}
         </Text>
         <SliderIOS
           style={styles.slider}
          step ={2}
          minimumValue={1}
          maximumValue={10}
          value = {Number(nBackAmount)}
           onValueChange={this._handleValueChanged} />
       </View>
     );
   }
 });

 var GameButtonAudio = React.createClass({

   getInitialState: function() {
    this._loadInitialState().done();


     return {
     trueSwitchIsOn: true,
     falseSwitchIsOn: false,
       };
   },

   async _loadInitialState() {
    try {
      audioSwitch = await AsyncStorage.getItem(AUDIO_KEY);
      imageSwitch = await AsyncStorage.getItem(IMAGE_KEY);
      if (audioSwitch !== null){
        this.setState({selectedValue: audioSwitch});
        console.log('Recovered audio selection from disk: ' + audioSwitch);
        //nBackAmount = Number(nBackAmount);
      } else {
        console.log('Initialized with audio  game type selection on disk.');
        audioSwitch = false;
      }
      if (imageSwitch !== null){
        this.setState({selectedValue: imageSwitch});
        console.log('Recovered image selection from disk: ' + imageSwitch);
        //nBackAmount = Number(nBackAmount);
      } else {
        console.log('Initialized with image game type selection on disk.');
        imageSwitch = true;
      }

    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },

  async _handleAudioChanged(value) {
     audioSwitch = value;


     this.setState({audio: audioSwitch});

     // save changed value in persistent storage

     try {
       await AsyncStorage.setItem(AUDIO_KEY, audioSwitch.toString());
      console.log('Saved selection to disk: ' + audioSwitch.toString());
         } catch (error) {
           this._appendMessage('AsyncStorage error: ' + error.message);
         }
    // end save changed value in persistent storage
     },

     async _handleImageChanged(value) {
        imageSwitch = value;


        this.setState({image: imageSwitch});

        // save changed value in persistent storage

        try {
          await AsyncStorage.setItem(IMAGE_KEY, imageSwitch.toString());
         console.log('Saved selection to disk: ' + imageSwitch.toString());
            } catch (error) {
              this._appendMessage('AsyncStorage error: ' + error.message);
            }
       // end save changed value in persistent storage
        },

   render: function() {
     return (
      <View style = {styles.textContainer}>
       <Text>

       {' Game Type: '}
       </Text>


       <View style={styles.buttonContainer}>

       <Text> {'Audio: '} </Text>
       <SwitchIOS
         onValueChange={this._handleAudioChanged}
         onTintColor= 'blue'
         thumbTintColor = '#c2c2d6'
         value={audioSwitch}/>
        <Text> {'Video: '} </Text>
       <SwitchIOS
         onValueChange={this._handleImageChanged}
         onTintColor='blue'
         thumbTintColor = '#c2c2d6'
         value={imageSwitch} />

       </View>
       </View>
     );
   }
 });


 var Settings = React.createClass({

   componentDidMount() {
   this._loadInitialState().done();
 },

 async _loadInitialState() {
  try {
    nBackAmount = await AsyncStorage.getItem(STORAGE_KEY);
    if (nBackAmount !== null){
      this.setState({selectedValue: nBackAmount});
      console.log('Recovered selection from disk: ' + nBackAmount);
    } else {
      console.log('Initialized with no selection on disk.');
      nBackAmount = 2;
    }
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }
},


   onNBackPress: function () {

      this.props.navigator.push ({
        title: 'nBack',
        component: MindBender,
      });
   },


   render: function () {
      return (

            <View style={[styles.pad, {backgroundColor: '#A0ACB8'}]}>

                        <Slider/>

            <View  style={{paddingTop:30}, {borderRadius:4}, {borderWidth: 1}, {flex: .3}}>

            <View style ={styles.buttonRowParentStyle}>
            <Text style= {styles.textContainer}>
            {' Select Game: \n'}
            </Text>

            <View style ={styles.buttonRowStyle}>


            <Icon.Button name="panorama" backgroundColor="#3b5998"  onPress={this.onNBackPress}>
               nBack Image
            </Icon.Button>


            <Icon.Button name="panorama" backgroundColor="#3b5998"  onPress={this.onNGridPress}>
               nBack Grid
            </Icon.Button>

            </View>
            </View>

            </View>

            <View style={{backgroundColor: '#D8DDE4'}, {paddingTop:20}, {flex:.3}, {borderRadius: 4}, {borderWidth: 1}}>

                        <GameButtonAudio/>
            </View>
            <View style={{flex: .2}}>
            </View>

            </View>

          );
        }

 });

 var Welcome = React.createClass({
   onPress: function () {


      this.props.navigator.push ({
        title: 'nBack',
        component: MindBender,
      });
   },


   render: function () {
     return (
       <View style={[styles.pad, {backgroundColor: '#A0ACB8'}]}>


      <TouchableHighlight onPress={this.onPress}>
      <Image source ={logoIcon}
             style = {styles.logo}>

        </Image>
      </TouchableHighlight>

       </View>

     )
   }
 });


var MindBenderNav = React.createClass({
  onRightButtonPress: function () {
    this.refs.nav.push({
      title: 'Settings',
      component: Settings
    })
  },

  render: function () {
     return (
       <NavigatorIOS ref="nav" style={styles.container}
          initialRoute={{
            component: Welcome,
            title: 'Welcome',
            rightButtonTitle: 'Settings',
            onRightButtonPress: this.onRightButtonPress,
          }}
         titleStyle= {styles.navTitle}
          />
     );

  }
});

 var styles = StyleSheet.create({

  slider: {
  //step: 1,
 },

 sliderContainer: {
  flex: .2,
  //flexDirection: 'column',
  borderRadius: 4,
  borderWidth: 1,

 },


container: {
    flex: 1,

  },

 pad: {
          padding: 20,
          paddingTop: 64,
          //marginTop: 20,
        //  width: windowSize.width,
        //  height: windowSize.height,
          flex: 1
      },

button: {

         width: 150,
         height: 50,
         alignSelf: 'center',
         resizeMode: 'contain',

      },

icon: {
                alignSelf: 'center',
                resizeMode: 'contain',
                fontSize: 20,
                fontWeight: 'bold'

         },

logo: {
               //paddingTop: 15,
               //paddingRight: 10,
                 width: windowSize.width,
                 height: windowSize.height,
              justifyContent: 'center',
              alignItems: 'stretch',
               alignSelf: 'center',
               resizeMode: 'stretch',
               //borderWidth: 2,
               borderColor: '#7b8994',
               flex: 1
      },

screenTitle: {
              flexDirection: 'row',
              paddingBottom: 20,
        },

  buttonRowParentStyle: {
        flex: 1,
        //flexDirection: 'row',
        borderRadius: 4,
        borderWidth: 1,


  },
  buttonRowStyle: {

    //flexDirection: 'row',
    //flex: .2,
    //flexDirection: 'row',
  //  flexWrap: 'nowrap',
    //backgroundColor: '#D8DDE4',
    flexWrap: 'nowrap',
    flexDirection: 'row',

    borderRadius: 4,
    justifyContent: 'space-around',
  //  borderWidth: 1,

    borderColor: '#96B5D5',

    alignItems: 'center',
    alignSelf: 'auto',
  //  alignSelf: 'center',
    paddingBottom: 100,
  },

  /* Game Buttons */

  navTitle: {
    fontFamily: 'Karnivore',


  },

  textContainer: {
    paddingTop: 2,
    flex: 1,
    //allowFontScaling: false,
    //backgroundColor: '#D8DDE4',

    //borderRadius: 4,
    //justifyContent: 'center',

  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    paddingTop: 10,
    //paddingBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    //backgroundColor: '#D8DDE4',
  },
  buttonInit: {
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  buttontouchable: {
    borderRadius: 100
  },
  buttonGameType: {
    backgroundColor: '#FF0000',
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: 'center'
  },

 });


AppRegistry.registerComponent('MindBenders', () => MindBenderNav);
module.exports = MindBenderNav;
