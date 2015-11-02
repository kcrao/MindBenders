var React = require('react-native');
var {
  AppRegistry,
  AlertIOS,
  AsyncStorage,
  StyleSheet,
  Image,
  Text,
  View,
  SliderIOS,
  NavigatorIOS,
  TouchableHighlight
} = React;


var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');


var gameLength=0;
var BOX_REF = "BOX";
var precomputeStyle = require('precomputeStyle');
var TimerMixin = require('react-timer-mixin');
//var UIExplorerButton = require('./UIExplorerButton');
var arrayIndex = 0;
var displayBlankImage = true;

/* Chunking randomizer variable setup BEGIN */
var imageMax = 7;

var idxRandomImage = Math.floor(Math.round((imageMax) * Math.random()));
var currenImageId = "";
var totalIntervals=0;
var gameRound= new Array();
var i=0;
var matchCounter=0;
var dbgString = "";
var nBackAmount=0;
var STORAGE_KEY = '@AsyncStorageMindBenders:key';


var ButtonIcon = require('react-native-vector-icons/Ionicons');

var ScoreIcon = require ('react-native-vector-icons/Ionicons');


var Icon = require('react-native-vector-icons/FontAwesome');

//var blankImage = [require ('image!blank'),];

/*
var ScoreRow = React.createClass ({
   render: function () {
      var scoreStyle = {
          flexDirection: 'row',
          backgroundColor: '#D8DDE4',
          borderWidth: 0.0,
          borderColor: '#96B5D5',
          alignSelf: 'center',
          marginTop: 20,
        //  marginBottom: 80
      };
      return (
        <View style = {[scoreStyle, this.props.style]}>
        {this.props.children}
        </View>
      );
   }

});

*/


var ButtonRow = React.createClass({
 render: function() {
   var imageStyle = {
     flexDirection: 'row',
     backgroundColor: '#D8DDE4',
     borderWidth: 0.0,
     borderColor: '#96B5D5',
     alignSelf: 'center',
     marginTop: 20,
     marginBottom: 80
   };
   return (
     <View style={[imageStyle, this.props.style]}>
       {this.props.children}
     </View>
   );
 }
});

/* Chunking randomizer variable setup END */


/* Function definition for chunking and random array population BEGIN */
// populateArray( 2, 7, 3 )
function populateArray(  numBack, nRandImages,  probRepeat ) {
var idx = 0;

     console.log("_____brain_buster.dbg_____" );
     var matchCount=0;
     while (matchCount<20) {


         if( idx > 0 )
         {
             var Chunk = Math.floor(Math.round((probRepeat) * Math.random())) ; // %50 chance num 0 or 1

             if( Chunk  <= 1  )
             {
             gameRound[idx] = gameRound[idx-1];
                 // console.log( "{",Chunk,"}," , gameRound[i] );
             }
         else
         gameRound[idx] = Math.floor(Math.round((nRandImages) * Math.random()));
         } else
         gameRound[idx] = Math.floor(Math.round((nRandImages) * Math.random()));

         dbgString = "Round["  + idx + "] " + gameRound[idx];


         if (gameRound[idx]==gameRound[idx-2])
           {
            // console.log ("So far you have " +matchCount + "matches");
            // console.log ("You have a match for the value " + gameRound[i] +'at' +i );
            dbgString = dbgString + ", M{" +   matchCount + "}";
            matchCount++;
           }

     console.log ( dbgString );

     // console.log ("\n");

     idx++;
  }
     gameLength=gameRound.length;
     console.log("_____brain_buster.dbg_____" );
     console.log ("You needed an array sized at " + gameLength);
}
/* Function definition for chunking and random array END */





/* Load Images from files */


var imageArray = [
  ['car', '#4F8EF7'],
  ['anchor', '#4F8EF7'],
  ['coffee', '#4F8EF7'],
  ['bell', '#4F8EF7'],
  ['heart', '#4F8EF7'],
  ['sun-o', '#4F8EF7'],
  ['rocket', '#4F8EF7'],
  ['key', '#4F8EF7'],
];



var ScoreCard = React.createClass ({

render: function () {
    var imgScoreSize = 18;
   return (


     <View style ={styles.scorecard}>

     <ScoreIcon name = "checkmark-circled"  size={imgScoreSize} color="#005C00" />
     <ScoreIcon name= "close-circled" size={imgScoreSize} color ="#700000" />
     <ScoreIcon name = "checkmark-circled"  size={imgScoreSize} color="#005C00" />
     <ScoreIcon name= "close-circled" size={imgScoreSize} color ="#700000" />
     <ScoreIcon name = "checkmark-circled"  size={imgScoreSize} color="#005C00" />
     <ScoreIcon name= "close-circled" size={imgScoreSize} color ="#700000" />
     <ScoreIcon name = "checkmark-circled"  size={imgScoreSize} color="#005C00" />
     <ScoreIcon name= "close-circled" size={imgScoreSize} color ="#700000" />
     <ScoreIcon name = "checkmark-circled"  size={imgScoreSize} color="#005C00" />
     <ScoreIcon name= "close-circled" size={imgScoreSize} color ="#700000" />
     <ScoreIcon name = "checkmark-circled"  size={imgScoreSize} color="#005C00" />
     <ScoreIcon name= "close-circled" size={imgScoreSize} color ="#700000" />
     <ScoreIcon name = "checkmark-circled"  size={imgScoreSize} color="#005C00" />
     <ScoreIcon name= "close-circled" size={imgScoreSize} color ="#700000" />
     <ScoreIcon name = "checkmark-circled"  size={imgScoreSize} color="#005C00" />
     <ScoreIcon name= "close-circled" size={imgScoreSize} color ="#700000" />
     <ScoreIcon name = "checkmark-circled"  size={imgScoreSize} color="#005C00" />
     <ScoreIcon name= "close-circled" size={imgScoreSize} color ="#700000" />
     <ScoreIcon name = "checkmark-circled"  size={imgScoreSize} color="#005C00" />
     <ScoreIcon name= "close-circled" size={imgScoreSize} color ="#700000" />

    </View>


   )

}


});


 var MindBender = React.createClass({


   mixins: [TimerMixin],

   getInitialState() {
     console.log ("in get initial state");
    console.log('in the game nbackamount is' +nBackAmount);
    arrayIndex=0;
    gameLength=0;
    gameRound=[];

    populateArray( 2, 7, 3 );
    return {
      arrayIndex: 0
     }
   },


   componentDidMount() {
     this._loadInitialState().done();

     this.imageTimer= setInterval(() => {
       //arrayIndex = arrayIndex + 1;
      // var nativeProps = precomputeStyle({transform: [{rotate: rotation.toString() + "deg"}]});
    //	this.refs[BOX_REF].setNativeProps(nativeProps);
    /*
    if (arrayIndex===14) {
      arrayIndex=0;
    }
    */

    this.setState({arrayIndex: this.state.arrayIndex + 1});

    if (arrayIndex===gameRound.length) {


      arrayIndex=0;
    }


  },500);
},
  // ASYNC load data from persistent storage
  async _loadInitialState() {
   try {
     nBackAmount = await AsyncStorage.getItem(STORAGE_KEY);
     if (nBackAmount !== null){
       this.setState({selectedValue: nBackAmount});
       console.log('Recovered selection from disk: for Game' + nBackAmount);
       nBackAmount=Number(nBackAmount);
       console.log ('Reformatted nback =' +nBackAmount);

     } else {
       console.log('Initialized with no selection on disk. for Game');
       nBackAmount = 2;
     }
   } catch (error) {
     console.log('AsyncStorage error: ' + error.message);
   }
 },

 componentWillUnmount () {



   
  gameLength = 0;

   clearInterval(this.imageTimer);
   console.log ("in component will unmount and gameLength is " + gameLength);
   MindBender=null;
 },

  audioMatchPress: function() {
    console.log ('Audio Match Button Pressed');
  },

  imageMatchPress: function () {
    console.log ('Image Match Button Pressed');
  },


   render: function() {


    displayBlankImage ^=true;
    //var {nBackAmount, ...other}= this.props;

    if (displayBlankImage==true) {
      var movie ='registered';
      var movieColor = '#D8DDE4';
    }
    else  {

    var imageIndex = gameRound[arrayIndex];
    var movie = imageArray[imageIndex][0];
    var movieColor = imageArray[imageIndex][1];
    ++arrayIndex;
  //  console.log(imageArray);
  //  console.log(arrayIndex);
  }
  
  /* Determine when last position in array reacth and prompt user to play again */
    if (arrayIndex==gameLength) {
      clearInterval(this.imageTimer);
     AlertIOS.alert(
       'Game Over - Play Again?',
       '',
       [
          {text: 'Play Again', onPress: () => console.log('Foo Pressed!')},
          {text: 'Quit', onPress: () => console.log('Bar Pressed!')},
       ]
     );

    }
     return (
       <View style={styles.box} >
      <View>

      <Text style={{alignSelf: 'center'}}> {'\n'+ nBackAmount + ' back' + '- On Turn ' + arrayIndex + ' of ' + gameLength + '\n'} </Text>



      <Icon name={movie} size={150} style={styles.thumbnail} color={movieColor} />


      </View>
      <View style = {{paddingTop: 20}, {alignItems: 'center'}}>
      <Text style = {{textAlign: 'center'}, {paddingBottom: 10}}>
      {'Your Score'}
      </Text>
      </View>

     <View style = {{paddingTop: 50}, {borderRadius: 4}, {borderWidth: .5}}>

     <ScoreCard/>
     <ScoreCard/>
      </View>
     <View style = {styles.buttonRowParentStyle}>
     <View style={styles.buttonRowStyle}>

     <ButtonIcon.Button name="mic-a" size={20} paddingRight={150} backgroundColor="gray" onPress={this.audioMatchPress}>

       <Text style={{ fontWeight: 'bold', color: 'white'}}>{'Audio Match'}</Text>

     </ButtonIcon.Button>

     <ButtonIcon.Button name="images" size={20} backgroundColor="gray" onPress={this.imageMatchPress}>

       <Text style={{ fontWeight: 'bold', color: 'white'}}>{'Image Match'}</Text>

     </ButtonIcon.Button>
     </View>
     </View>
     <View style={styles.footer}>
     </View>
    </View>
     );
   }
 });

 var styles = StyleSheet.create({
   box: {
     marginTop: 1,
     //width: this.state.width,
    // height: this.state.height,
    alignItems: 'stretch',
    alignSelf: 'stretch',
     backgroundColor: '#D8DDE4',
     paddingTop: 64,
     //padding: 20,
     flex: 1
   },
   thumbnail: {
     //marginTop: 100,
     //marginBottom: 25,
     //width: 160,
     //height: 160,
     borderWidth: 1,
     borderColor: '#7b8994',
     alignItems: 'stretch',
     alignSelf: 'center',
     //justifyContent: 'center',
     //resizeMode: 'contain',
     flex: .5,
   },

   buttonRowParentStyle: {
         flex: .25,
         flexDirection: 'row',
         paddingTop: 2,
         paddingLeft: 10,
         paddingRight:10,


   },

   buttonRowStyle: {

     //flexDirection: 'row',
     flex: 1,
     flexDirection: 'row',
     //flexWrap: 'nowrap',
     //backgroundColor: '#D8DDE4',
     borderRadius: 4,
     justifyContent: 'space-around',
   //  borderWidth: 1,

     borderColor: '#96B5D5',

     alignItems: 'center',
     alignSelf: 'center',
     //paddingBottom: 5,

   },


  scorecard: {
     flex: .05,
     flexDirection: 'row',
     flexWrap: 'nowrap',
     borderRadius: 4,
     justifyContent: 'space-around',
     alignSelf: 'stretch',
     alignItems: 'stretch',
     //paddingBottom: 2,
     //backgroundColor: 'white',


  },

   footer: {
     flex: .25,
     paddingTop: 20,
     paddingBottom: 80,
   }

});


module.exports = MindBender;
