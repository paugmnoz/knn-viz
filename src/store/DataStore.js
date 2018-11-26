import { observable, action } from "mobx";
import * as d3 from "d3";
import dataset from '../json/datosknn.json';
import svgdataset from '../json/svgdata.json';

class DataStore {

    @observable person1 = ''
    @observable person2 = ''
    @observable tempsquad = [];
    @observable squadlist = [];

    @observable data = {};
    @observable datasvg = {};
    @observable userssvg = {};
    @observable users = {};
    @observable squadinfo = {};
  
    @observable similarity = 0;
    @observable genSim = 0;
    @observable comSim = 0;
    @observable matchSim = 0;
    @observable pollOneSim = 0;
    @observable pollTwoSim = 0;
    @observable pollThreeSim = 0;
    @observable pollFourSim = 0;

    @observable dotProduct = 0;

    @observable pollOneN = [];
    @observable pollTwoN = [];
    @observable pollThreeN = [];
    @observable pollFourN = [];
    @observable genneigbhors = [];
    @observable comicNeighs = [];

    @observable genneigbhorsScores = {};
    @observable comicNeighsScores = {};
    @observable pollOneScores = {};
    @observable pollTwoScores = {};
    @observable pollThreeScores = {};
    @observable pollFourScores = {};
    @observable squadScores = {};
    @observable planScores = {};

    @observable time =[];
    @observable imp =[];
    @observable coffee =[];
    @observable coffeeTaste =[];
    @observable coffeeTemp =[];
    @observable music =[];
    @observable type =[];
    @observable gender =[];
    @observable movie =[];
    
    @observable finalplanOne = ''
    @observable finalplanTwo = ''
    @observable finalplanThree = ''
    constructor () {
        this.data = dataset.users;
         this.data.forEach(e => {
             let name = e.nombre;
             this.users[name] = e;
         });

         this.datasvg = svgdataset.users;
         this.data.forEach(e => {
             let name = e.nombre;
             this.userssvg[name] = e;
         });
    }

    @action
    clean(lastneihgs, lastscores) {
        lastneihgs.length = 0;
        lastscores.length = 0;
    }

    @action
    squadPlan() {
        this.data.forEach(e => {
            if(this.tempsquad.includes(e.nombre)){
                this.squadlist.push(e);
            }
        })
        let tempcategories = ['planNoche', 'planDia', 'ImpTema', 'ImpAutor', 'ImpEstilo','Cafee', 'CafeDulce', 'CafeAmargo', 'CafeCaliente','CafeFrio',
        'Rock', 'Electronica', 'Metal', 'Rap', 'Pop', 'planIndoor', 'planOutdoor', 'Fantastico', 'Misterio', 'Ficcion', 'Mitologica', 'Romantico', 'peliAnimadas']
        let _time = ['planNoche', 'planDia']
        let _imp = [ 'ImpTema', 'ImpAutor', 'ImpEstilo'];
        let _coffee = [ 'Cafee'];
        let _coffeeTaste = [ 'CafeDulce', 'CafeAmargo']
        let _coffeeTemp = [ 'CafeCaliente','CafeFrio']
        let _music = ['Rock', 'Electronica', 'Metal', 'Rap', 'Pop'];
        let _type =['planIndoor', 'planOutdoor']
        let _gender = [ 'Fantastico', 'Misterio', 'Ficcion', 'Mitologica', 'Romantico'];
        let _movie = ['peliAnimadas']
        
        let ratings = this.users[this.squadlist[0].nombre];
        let titles = Object.keys(ratings);

        let categories = []
        tempcategories.forEach(e => {
            let temptitles =  titles[titles.indexOf(e)]
            categories.push(temptitles)
        })
        categories.forEach(e => {
          this.squadScores[e] = this.preference(this.squadlist, e );
        })
        this.time = this.setpreference(_time, this.squadScores)
        this.imp = this.setpreference(_imp, this.squadScores);
        this.coffee = this.setpreference(_coffee, this.squadScores);
        this.coffeeTaste = this.setpreference(_coffeeTaste, this.squadScores);
        this.coffeeTemp = this.setpreference(_coffeeTemp, this.squadScores);
        this.music = this.setpreference(_music, this.squadScores);
        this.type = this.setpreference(_type, this.squadScores);
        this.gender = this.setpreference(_gender, this.squadScores);
        this.movie = this.setpreference(_movie, this.squadScores);
        console.log(this.time[0]);
        this.finalplanOne = this.planOne();
        this.finalplanTwo = this.planTwo();
        this.finalplanThree = this.planThree();
    }

    @action 
    timepicked(){
        let a = ''
        if(this.time[0] == 'planNoche'){
            a = 'noche'
        } else {
            a = 'día'
        }
        return a
    }

    @action 
    typepicked() {
        let b = ''
        if(this.type[0] == 'planIndoor'){
            b = 'una casa'
        } else {
            b = 'un parque'
        }
        return b;
    }

    @action
    planThree() {
      
        let c = ''
        switch(this.imp[0]) {
            case 'ImpTema':
            c = 'tema'
            break 

            case 'ImpAutor':
            c = 'autor'
break;
            case 'ImpEstilo':
            c = 'estilo gráfico'
break;        }
return 'Ya que les interesa más el ' + c + ' de una producción, pueden salir a cine a ver una película  ' + this.gender[0] + '.'


    }
    @action
    planOne() {
      
        let c = ''
        switch(this.imp[0]) {
            case 'ImpTema':
            c = 'los temas'
            break;
            case 'ImpAutor':
            c = 'los autores'
            break;
            case 'ImpEstilo':
            c = 'los mejores ilustradores'
            break;
        }
       
        return 'Ir de ' + this.timepicked() + ' a ' + this.typepicked() + ' y hablar sobre ' +c+ ' de comics ' + this.gender[0] + '.'

    }

    @action
    planTwo() {
      
        let a = ''
        switch(this.coffeeTemp[0]) {
            case 'CafeFrio':
            switch(this.coffeeTaste[0]) {
                case 'CafeDulce':
                a = 'frapuccino'
                break;
                case 'CafeAmargo':
                a = 'coldBrew'
                break;
            }
            break;
            case 'CafeCaliente':
            switch(this.coffeeTaste[0]) {
                case 'CafeDulce':
                a = 'capuccino'
                break;
                case 'CafeAmargo':
                a = 'tinto'
                break;
            }
            break;
          
        }
        let c = ''
        switch(this.imp[0]) {
            case 'ImpTema':
            c = 'el tema mas popular'
            break;
            case 'ImpAutor':
            c = 'autores favoritos'
            break;
            case 'ImpEstilo':
            c = 'estilo gráfico'
            break;
        }
        
        return 'Conversar acerca de ' + c + ' de comics mientras toman un ' + a + ' y suena música ' + this.music[0] + 'a cualquier hora ' + this.timepicked() + '.'

    }
    @action
    setpreference(aspect, squadScores) {
        let cats = Object.keys(squadScores);
      
        let temparray = [];
        cats.forEach(e => {
            aspect.forEach( d => {
                if (e == d) {
                    let tempcat = squadScores[e]
                    temparray[d] = tempcat;
                }
            })
        })
        var sortable = [];
        for (var _aspect in temparray) {
            sortable.push([_aspect, temparray[_aspect]]);
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        return [sortable[0][0],sortable[0][1]]
    }
    @action 
    preference(squadlist, category) {
        let catScoreList = [];
        let sumscores = 0;
        squadlist.forEach( e => {
            let temprate = this.users[e.nombre];
            catScoreList.push(temprate[category])
        })
        
        catScoreList.forEach( e=> {
            sumscores += e;
        }) 
        return sumscores/catScoreList.length;
    }
    @action 
    matchSimilarity () {
        this.matchSim =0 ;
        this.dotProduct = 0;

        let ratings1 = this.users[this.person1];
        let ratings2 = this.users[this.person2];

        let titles = Object.keys(ratings1);
        let i = titles.indexOf('nombre');
        titles.splice(i,1);
        let j = titles.indexOf('ID');
        titles.splice(j,1);
        let k = titles.indexOf('foto');
        titles.splice(k,1);

        let d1 = 0
        let d2 = 0
        titles.forEach( e => {
            let _rating1 = ratings1[e];
            let _rating2 = ratings2[e];
            
            this.dotProduct += _rating1*_rating2;
            d1 += _rating1*_rating1;
            d2 += _rating2*_rating2;
        });

        let cos = (this.dotProduct/ (Math.sqrt(d1)*Math.sqrt(d2)))*100;
        this.matchSim = Math.round(cos*100)/100;
    }

    @action
    calculate(other, titles) {
        this.similarity =0 ;
        this.dotProduct = 0;

        let ratings1 = this.users[this.person1];
        let ratings2 = this.users[other];

        let d1 = 0
        let d2 = 0


        titles.forEach( e => {
            let _rating1 = ratings1[e];
            let _rating2 = ratings2[e];
            
            this.dotProduct += _rating1*_rating2;
            d1 += _rating1*_rating1;
            d2 += _rating2*_rating2;

        });
        let cos = (this.dotProduct/ (Math.sqrt(d1)*Math.sqrt(d2)))*100;
        return this.similarity = Math.round(cos*100)/100;
    }
     @action
    pollOne(k){
        this.pollOneSim =0 ;

        let score1 = 0;
        let score2 = 0;

        let ratings1 = this.users[this.person1];
        let titles = Object.keys(ratings1);
 
        let newTittles = []
        let a = titles[titles.indexOf('Cafee')]
        let b = titles[titles.indexOf('CafeFrio')]
        let c = titles[titles.indexOf('planNoche')]
        let d = titles[titles.indexOf('NovelasGraficas')]
        let e = titles[titles.indexOf('Fantastico')]
        newTittles.push(a,b,c,d,e);
        
        let scores = {}
        this.data.forEach(e => {
            let other = e.nombre;
            if(other !== this.person1) {
                this.pollOneSim = this.calculate(other, newTittles);
               scores[other] = this.pollOneSim;

            } else {
                scores[other] = -1;
            }
        });
        this.pollOneN = this.data.slice().sort(comparesimilarity);
            function  comparesimilarity(a,b){
             score1 = scores[a.nombre]
             score2 = scores[b.nombre]
             return score2 - score1;
            }
            this.pollOneScores = scores;

            this.pollOneN.replace(this.pollOneN.slice(0,k));
    }

    @action
    pollTwo(k){
        this.pollTwoSim =0 ;
        let score1 = 0;
        let score2 = 0;
        let ratings1 = this.users[this.person1];
        let titles = Object.keys(ratings1);
        let newTittles = []
        let a = titles[titles.indexOf('artesPlasticas')]
        let b = titles[titles.indexOf('museoLocal')]
        let c = titles[titles.indexOf('ImpEstilo')]
        let d = titles[titles.indexOf('NovelasGraficas')]
        let e = titles[titles.indexOf('planDia')]
        newTittles.push(a,b,c,d,e);
        let scores = {}
        this.data.forEach(e => {
            let other = e.nombre;
            if(other !== this.person1) {
                this.pollTwoSim = this.calculate(other, newTittles);
               scores[other] = this.pollTwoSim;

            } else {
                scores[other] = -1;
            }
        });
        this.pollTwoN = this.data.slice().sort(comparesimilarity);
            function  comparesimilarity(a,b){
             score1 = scores[a.nombre]
             score2 = scores[b.nombre]
             return score2 - score1;
            }
            this.pollTwoScores = scores;
            this.pollTwoN.replace(this.pollTwoN.slice(0,k));
    }

    @action importancia(imp){
        let scores = {}
        let _sim = 0;
        let _neigh = [];
        let _scores = {};

        let score1 = 0;
        let score2 = 0;

        let ratings1 = this.users[this.person1];
        let titles = Object.keys(ratings1);
        let newTittles = []
        let a = titles[titles.indexOf('NovelasGraficas')]
        let b = titles[titles.indexOf(imp)]
        newTittles.push(a,b);
        
        this.data.forEach(e => {
            let other = e.nombre;
            if(other !== this.person1) {
                _sim = this.calculate(other, newTittles);
            scores[other] = _sim;

            } else {
                scores[other] = -1;
            }
        });

        _neigh = this.data.slice().sort(comparesimilarity);
            function  comparesimilarity(a,b){
            score1 = scores[a.nombre]
            score2 = scores[b.nombre]
            return score2 - score1;
            }
            _scores = scores;
            let finaltempneighs = [] 
            var n=-1
            while (n<=20) {
                n++;
                finaltempneighs.push(_neigh[n])
            }

            finaltempneighs.forEach(e => {
                console.log(e.nombre, _scores[e.nombre] );
            });
            return finaltempneighs;
    }

  
    @action
    pollThree(k){
        this.pollThreeSim =0 ;

        let score1 = 0;
        let score2 = 0;

        let ratings1 = this.users[this.person1];
        let titles = Object.keys(ratings1);

        let finalList = this.importancia('ImpTema');
        let newTittles = []
        let a = titles[titles.indexOf('planPocaGente')]
        let b = titles[titles.indexOf('planNoche')]
        let c = titles[titles.indexOf('peliCasa')]
        let d = titles[titles.indexOf('peliIndependientes')]
        newTittles.push(a,b,c,d);
    
        let scores = {}
        finalList.forEach(e => {
            let other = e.nombre;
            if(other !== this.person1) {
                this.pollThreeSim = this.calculate(other, newTittles);
            scores[other] = this.pollThreeSim;

            } else {
                scores[other] = -1;
            }
        });
        this.pollThreeN = finalList.sort(comparesimilarity);
            function  comparesimilarity(a,b){
            score1 = scores[a.nombre]
            score2 = scores[b.nombre]
            return score2 - score1;
            }
            this.pollThreeScores = scores;
            this.pollThreeN.forEach(e => {
                console.log('finales', e.nombre, scores[e.nombre]);
            });
            this.pollThreeN.replace(this.pollThreeN.slice(0,k));
    }

    
    @action
    pollFour(k){
        this.pollFourSim =0 ;

        let score1 = 0;
        let score2 = 0;

        let ratings1 = this.users[this.person1];
        let titles = Object.keys(ratings1);

        let finalList = this.importancia('ImpAutor');
        let newTittles = []
        let a = titles[titles.indexOf('citaComer')]
        let b = titles[titles.indexOf('ClubNG')]
        let c = titles[titles.indexOf('Japon')]
        let d = titles[titles.indexOf('RockPop')]
        newTittles.push(a,b,c,d);
    
        let scores = {}
        finalList.forEach(e => {
            let other = e.nombre;
            if(other !== this.person1) {
                this.pollFourSim = this.calculate(other, newTittles);
            scores[other] = this.pollFourSim;

            } else {
                scores[other] = -1;
            }
        });
        this.pollFourN = finalList.sort(comparesimilarity);
            function  comparesimilarity(a,b){
            score1 = scores[a.nombre]
            score2 = scores[b.nombre]
            return score2 - score1;
            }
            this.pollFourScores = scores;
            this.pollFourN.forEach(e => {
                console.log('finales', e.nombre, scores[e.nombre]);
            });
            this.pollFourN.replace(this.pollFourN.slice(0,k));
    }

    
    @action
    comicNeighbours(k){
        this.comSim =0 ;
        this.dotProduct = 0;
        let score1 = 0;
        let score2 = 0;

        let scores = {}
        let ratings1 = this.users[this.person1];

        let titles = Object.keys(ratings1);
    
        let newTittles = []
        let a = titles[titles.indexOf('NovelasGraficas')]
        let b = titles[titles.indexOf('ClubNG')]
        let c = titles[titles.indexOf('ImpTema')]
        let d = titles[titles.indexOf('ImpAutor')]
        let e = titles[titles.indexOf('ImpEstilo')]
        newTittles.push(a,b,c,d,e);

        this.data.forEach(e => {
            let other = e.nombre;
            if(other !== this.person1) {
                this.comSim = this.calculate(other, newTittles);
               scores[other] = this.comSim;

            } else {
                scores[other] = -1;
            }
        });

        this.comicNeighs = this.data.slice().sort(comparesimilarity);
            function  comparesimilarity(a,b){
             score1 = scores[a.nombre]
             score2 = scores[b.nombre]
             return score2 - score1;
            }
            this.comicNeighsScores = scores;
            this.comicNeighs.replace(this.comicNeighs.slice(0,k));
    }

    @action
    generalNeighbourhood(k){
        this.genSim =0 ;
        this.dotProduct = 0;
        let score1 = 0;
        let score2 = 0;

        let scores = {}
        let ratings1 = this.users[this.person1];

        let titles = Object.keys(ratings1);
    
        let i = titles.indexOf('nombre');
        titles.splice(i,1);
        let j = titles.indexOf('ID');
        titles.splice(j,1);
        let h = titles.indexOf('foto');
        titles.splice(h,1);

        this.data.forEach(e => {
            let other = e.nombre;
            if(other !== this.person1) {
                this.genSim = this.calculate(other, titles);
               scores[other] = this.genSim;

            } else {
                scores[other] = -1;
            }
        });

        this.genneigbhors = this.data.slice().sort(comparesimilarity);
            function  comparesimilarity(a,b){
             score1 = scores[a.nombre]
             score2 = scores[b.nombre]
             return score2 - score1;
            }
            this.genneigbhorsScores = scores;
            this.genneigbhors.replace(this.genneigbhors.slice(0,k));
    }

}

export const store = new DataStore();
