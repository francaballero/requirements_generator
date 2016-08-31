/*global angular: true, jsPDF: true, $: true, document: true, window: true, setTimeout: true */


var app = angular.module('application', ['ngStorage']);

// Directive to validate inputs
app.directive('wjValidationError', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctl) {
            scope.$watch(attrs.wjValidationError, function (errorMsg) {
                elm[0].setCustomValidity(errorMsg);
                ctl.$setValidity('wjValidationError', errorMsg ? false : true);
            });
        }
    };
});

app.directive('myDirec', ['$log', '$templateCache', '$compile', function ($log, $templateCache, $compile) {
    return {
        restrict: 'A',
        priority: 1000,

        link: function (scope, element, attr) {
            element.children().attr('data-toggle', 'tooltip');
            element.children().attr('data-placement', 'tooltip');
            element.children().attr('title', 'hello tool tip');

            $compile(element)(scope);
        },
    };
}]);

app.controller('appController', ['$scope', '$localStorage', '$sessionStorage', '$window',
            function ($scope, $localStorage, $sessionStorage, $window) {

        //
        // DATA Section
        //

        //Navigation variables
        $scope.home = true;
        $scope.master = false;
        $scope.ears = false;
        $scope.glossary = false;
        $scope.results = false;


        // Requirements variables
        $scope.terms = [];
        $scope.functionalrequirements = [];
        $scope.propertyrequirements = [];
        $scope.environmentrequirements = [];
        $scope.processrequirements = [];
        $scope.conditions = [];

        $scope.ubiquitousrequirements = [];
        $scope.eventrequirements = [];
        $scope.unwantedrequirements = [];
        $scope.staterequirements = [];
        $scope.optionalrequirements = [];
        $scope.complexrequirements = [];


        $scope.term_saved = true;
        $scope.term_input = {};

        $scope.defined_master = false;
        $scope.defined_ears = false;
        $scope.defined_terms = false;

        var delay = 2500; //Delay after green hover

        // Load cookies information
        angular.element(document).ready(function () {
            //Load terms
            var terms = $localStorage.terms;
            if (terms) {
                $scope.terms = $localStorage.terms;
                if (!$scope.defined_terms) $scope.defined_terms = true;
            }

            //Load MASTER requirements
            var functionalrequirements = $localStorage.functionalrequirements;
            if (functionalrequirements) {
                $scope.functionalrequirements = functionalrequirements;
                if (!$scope.defined_master) $scope.defined_master = true;
            }
            var propertyrequirements = $localStorage.propertyrequirements;
            if (propertyrequirements) {
                $scope.propertyrequirements = propertyrequirements;
                if (!$scope.defined_master) $scope.defined_master = true;
            }
            var environmentrequirements = $localStorage.environmentrequirements;
            if (environmentrequirements) {
                $scope.environmentrequirements = environmentrequirements;
                if (!$scope.defined_master) $scope.defined_master = true;
            }
            var processrequirements = $localStorage.processrequirements;
            if (processrequirements) {
                $scope.processrequirements = processrequirements;
                if (!$scope.defined_master) $scope.defined_master = true;
            }
            var conditions = $localStorage.conditions;
            if (conditions) {
                $scope.conditions = conditions;
                if (!$scope.defined_master) $scope.defined_master = true;
            }

            //Load EARS requirements
            var ubiquitousrequirements = $localStorage.ubiquitousrequirements;
            if (ubiquitousrequirements) {
                $scope.ubiquitousrequirements = ubiquitousrequirements;
                if (!$scope.defined_ears) $scope.defined_ears = true;
            }
            var eventrequirements = $localStorage.eventrequirements;
            if (eventrequirements) {
                $scope.eventrequirements = eventrequirements;
                if (!$scope.defined_ears) $scope.defined_ears = true;
            }
            var unwantedrequirements = $localStorage.unwantedrequirements;
            if (unwantedrequirements) {
                $scope.unwantedrequirements = unwantedrequirements;
                if (!$scope.defined_ears) $scope.defined_ears = true;
            }
            var staterequirements = $localStorage.staterequirements;
            if (staterequirements) {
                $scope.staterequirements = staterequirements;
                if (!$scope.defined_ears) $scope.defined_ears = true;
            }
            var optionalrequirements = $localStorage.optionalrequirements;
            if (optionalrequirements) {
                $scope.optionalrequirements = optionalrequirements;
                if (!$scope.defined_ears) $scope.defined_ears = true;
            }
            var complexrequirements = $localStorage.complexrequirements;
            if (complexrequirements) {
                $scope.complexrequirements = complexrequirements;
                if (!$scope.defined_ears) $scope.defined_ears = true;
            }
        });

        //Clear
        $scope.clearTerms = function () {
            $scope.terms = [];
            delete $localStorage.terms;
            $scope.defined_terms = false;
        };

        $scope.clearMaster = function () {
            $scope.functionalrequirements = [];
            $scope.propertyrequirements = [];
            $scope.environmentrequirements = [];
            $scope.processrequirements = [];
            $scope.conditions = [];
            delete $localStorage.functionalrequirements;
            delete $localStorage.propertyrequirements;
            delete $localStorage.environmentrequirements;
            delete $localStorage.processrequirements;
            delete $localStorage.conditions;
            $scope.defined_master = false;
        };

        $scope.clearEars = function () {
            $scope.ubiquitousrequirements = [];
            $scope.eventrequirements = [];
            $scope.unwantedrequirements = [];
            $scope.staterequirements = [];
            $scope.optionalrequirements = [];
            $scope.complexrequirements = [];
            delete $localStorage.ubiquitousrequirements;
            delete $localStorage.eventrequirements;
            delete $localStorage.unwantedrequirements;
            delete $localStorage.staterequirements;
            delete $localStorage.optionalrequirements;
            delete $localStorage.complexrequirements;
            $scope.defined_ears = false;
        };


        //
        // Global functions Section
        //

        var titleCase = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        var titleLowerCase = function (string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
        };

        // Only enable if the document has a long scroll bar
        // Note the window height + offset
        if (($(window).height() + 100) < $(document).height()) {
            $('#top-link-block').removeClass('hidden').affix({
                // how far to scroll down before link "slides" into view
                offset: {
                    top: 100
                }
            });
        }


        //
        // General behaviour functions Section
        //


        //Navegation functions
        $scope.goHome = function () {
            $scope.master = $scope.ears = $scope.glossary = $scope.results = false;
            $scope.home = true;
        };
        $scope.goMaster = function () {
            $scope.home = $scope.ears = $scope.glossary = $scope.results = false;
            $scope.master = true;
        };
        $scope.goEars = function () {
            $scope.home = $scope.master = $scope.glossary = $scope.results = false;
            $scope.ears = true;
        };
        $scope.goGlossary = function () {
            $scope.home = $scope.master = $scope.ears = $scope.results = false;
            $scope.glossary = true;
        };
        $scope.goResults = function () {
            $scope.home = $scope.master = $scope.ears = $scope.glossary = false;
            $scope.results = true;
        };


        // Print results
        $scope.printIt = function () {
            var table = document.getElementById('result').innerHTML;
            var myWindow = window.open('', '', 'width=800, height=600');
            myWindow.document.write(table);
            myWindow.print();
        };



        // Generate PDF with the results
        var doc = new jsPDF('p', 'pt', 'a4');
        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };

        $scope.generatePDF = function () {
            //console.log("Generating PDF...");
            doc.fromHTML($('#result').html(), 50, 25, {
                'width': 500, // max width of content on PDF
                'margin': 1,
                'pagesplit': true,
                'elementHandlers': specialElementHandlers
            });

            doc.output('save', 'results.pdf');
            doc = new jsPDF('p', 'pt', 'a4');
        };
        // END pdf


        //Notify the user where to click
        $scope.newTermOver = function (term) {
            var myElements = document.getElementsByClassName("new-term");

            for (var i = 0; i < myElements.length; i++) {
                myElements[i].style.background = 'rgba(0, 181, 165, .4)';
            }
        };

        $scope.newTermLeave = function () {
            var myElements = document.getElementsByClassName("new-term");

            setTimeout(function () {
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = '';
                }
            }, delay);

        };

        $scope.newConditionOver = function () {
            var myElements = document.getElementsByClassName("condition");

            for (var i = 0; i < myElements.length; i++) {
                myElements[i].style.background = 'rgba(0, 181, 165, .4)';
            }
        };

        $scope.newConditionLeave = function () {
            var myElements = document.getElementsByClassName("condition");

            setTimeout(function () {
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = '';
                }
            }, delay);
        };


        // Terms
        $scope.newTerm = function () {
            $scope.terms.push({
                name: '',
                definition: ''
            });
            $('.success').hide();
            $scope.term_saved = false;
        };

        $scope.addtoTerms = function (i) {
            if (!$scope.defined_terms) $scope.defined_terms = true;
            $('.success').show().delay(2500).fadeOut();
            $scope.terms[$scope.terms.length - 1].name = $scope.term_input.name;
            $scope.term_input = {};
            $scope.term_saved = true;
        };


        $scope.removeTerm = function (i) {
            $scope.terms.splice(i, 1);
            if ($scope.terms.length === 0) {
                delete $localStorage.terms;
                $scope.defined_terms = false;
            } else {
                $localStorage.terms = $scope.terms;
            }
        };
        // END terms



        //
        // MASTER functions Section
        //


        // Liabilities
        $scope.liabilities = [
            {
                name: 'shall',
            },
            {
                name: 'should',
            },
            {
                name: 'will',
            }
        ];

        $scope.addLiability = function (i) {
            $scope.functionalmaster[i].name = $scope.selected.name;
        };
        // END liabilities



        // FunctionalMASTER
        $scope.functional_terms = [
            {
                name: '-',
            },
            {
                name: 'provide <actor> with the ability to',
            },
            {
                name: 'be able to',
            }
        ];

        $scope.newFunctionalReq = function () {
            $scope.functionalrequirements.push([{
                    to_string: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'provide'
            }, {
                    name: ''
            }, {
                    name: 'with the ability to'
            }, {
                    name: ''
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_master) $scope.defined_master = true;
        };

        $scope.removeFunctionalReq = function (i) {
            $scope.functionalrequirements.splice(i, 1);
            if ($scope.functionalrequirements.length === 0) {
                delete $localStorage.functionalrequirements;
            } else {
                $localStorage.functionalrequirements = $scope.functionalrequirements;
            }
            if ($scope.functionalrequirements.length === 0 && $scope.propertyrequirements.length === 0 && $scope.environmentrequirements.length === 0 && $scope.processrequirements.length === 0 && $scope.conditions.length === 0) {
                $scope.defined_master = false;
            }
        };

        $scope.addtoFunctionalReq = function (i, j, selected) {
            if (selected) {
                if (selected[1] && selected[1].to_string) { // We push condition
                    $scope.functionalrequirements[i][j].name = selected[1].to_string;
                } else {
                    if (!selected.name)
                        $scope.functionalrequirements[i][j].name = selected;
                    else
                        $scope.functionalrequirements[i][j].name = selected.name;
                }

                //To-string
                if ($scope.functionalrequirements[i][1].name) {
                    $scope.functionalrequirements[i][0].to_string = $scope.functionalrequirements[i][1].name + ', ';
                } else {
                    $scope.functionalrequirements[i][0].to_string = '';
                }
                $scope.functionalrequirements[i][0].to_string += $scope.functionalrequirements[i][2].name + ' ' + $scope.functionalrequirements[i][3].name + ' ';

                switch ($scope.functionalrequirements[i][4].name) {
                case 'provide <actor> with the ability to':
                    $scope.functionalrequirements[i][0].to_string += $scope.functionalrequirements[i][5].name + ' ' + $scope.functionalrequirements[i][6].name + ' ' + $scope.functionalrequirements[i][7].name + ' ';
                    break;
                case 'be able to':
                    $scope.functionalrequirements[i][0].to_string += $scope.functionalrequirements[i][4].name + ' ';
                }

                $scope.functionalrequirements[i][0].to_string += $scope.functionalrequirements[i][8].name + ' ' + $scope.functionalrequirements[i][9].name;

                $scope.functionalrequirements[i][0].to_string = $scope.functionalrequirements[i][0].to_string.trim();
                $scope.functionalrequirements[i][0].to_string = titleCase($scope.functionalrequirements[i][0].to_string + '.');

                //LocalStorage
                $localStorage.functionalrequirements = $scope.functionalrequirements;
            }
        };
        // END FunctionalMASTER


        // PropertyMASTER
        $scope.newPropertyReq = function () {
            $scope.propertyrequirements.push([{
                to_string: ''
            }, {
                name: ''
            }, {
                name: ''
            }, {
                name: ''
            }, {
                name: ''
            }, {
                name: 'be'
            }, {
                name: ''
            }, {
                name: ''
            }]);
            if (!$scope.defined_master) $scope.defined_master = true;
        };

        $scope.removePropertyReq = function (i) {
            $scope.propertyrequirements.splice(i, 1);
            if ($scope.propertyrequirements.length === 0) {
                delete $localStorage.propertyrequirements;
            } else {
                $localStorage.propertyrequirements = $scope.propertyrequirements;
            }
            if ($scope.functionalrequirements.length === 0 && $scope.propertyrequirements.length === 0 && $scope.environmentrequirements.length === 0 && $scope.processrequirements.length === 0 && $scope.conditions.length === 0) {
                $scope.defined_master = false;
            }
        };

        $scope.addtoPropertyReq = function (i, j, selected) {
            if (selected) {
                if (selected[1] && selected[1].to_string) {
                    $scope.propertyrequirements[i][j].name = selected[1].to_string;
                } else {
                    if (!selected.name)
                        $scope.propertyrequirements[i][j].name = selected;
                    else
                        $scope.propertyrequirements[i][j].name = selected.name;
                }
                if ($scope.propertyrequirements[i][1].name) {
                    $scope.propertyrequirements[i][0].to_string = $scope.propertyrequirements[i][1].name + ', ';
                } else {
                    $scope.propertyrequirements[i][0].to_string = '';
                }

                $scope.propertyrequirements[i][0].to_string += $scope.propertyrequirements[i][2].name + ' ' + $scope.propertyrequirements[i][3].name + ' ' + $scope.propertyrequirements[i][4].name + ' ' + $scope.propertyrequirements[i][5].name + ' ';

                if ($scope.propertyrequirements[i][6].name) {
                    $scope.propertyrequirements[i][0].to_string += $scope.propertyrequirements[i][6].name + ' ';
                }

                $scope.propertyrequirements[i][0].to_string += $scope.propertyrequirements[i][7].name;

                $scope.propertyrequirements[i][0].to_string = $scope.propertyrequirements[i][0].to_string.trim();
                $scope.propertyrequirements[i][0].to_string = titleCase($scope.propertyrequirements[i][0].to_string + '.');

                $localStorage.propertyrequirements = $scope.propertyrequirements;
            }
        };
        // END PropertyMASTER



        // EnvironmentMASTER
        $scope.newEnvironmentReq = function () {
            $scope.environmentrequirements.push([{
                    to_string: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'be designed in a way'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'can be operated'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_master) $scope.defined_master = true;
        };

        $scope.removeEnvironmentReq = function (i) {
            $scope.environmentrequirements.splice(i, 1);
            if ($scope.environmentrequirements.length === 0) {
                delete $localStorage.environmentrequirements;
            } else {
                $localStorage.environmentrequirements = $scope.environmentrequirements;
            }
            if ($scope.functionalrequirements.length === 0 && $scope.propertyrequirements.length === 0 && $scope.environmentrequirements.length === 0 && $scope.processrequirements.length === 0 && $scope.conditions.length === 0) {
                $scope.defined_master = false;
            }
        };

        $scope.addtoEnvironmentReq = function (i, j, selected) {
            if (selected) {
                if (selected[1] && selected[1].to_string) {
                    $scope.environmentrequirements[i][j].name = selected[1].to_string;
                } else {
                    if (!selected.name)
                        $scope.environmentrequirements[i][j].name = selected;
                    else
                        $scope.environmentrequirements[i][j].name = selected.name;
                }

                if ($scope.environmentrequirements[i][1].name) {
                    $scope.environmentrequirements[i][0].to_string = $scope.environmentrequirements[i][1].name + ' ';
                } else {
                    $scope.environmentrequirements[i][0].to_string = '';
                }

                $scope.environmentrequirements[i][0].to_string += $scope.environmentrequirements[i][2].name + ' ' + $scope.environmentrequirements[i][3].name + ' ' + $scope.environmentrequirements[i][4].name;

                if ($scope.environmentrequirements[i][5].name) {
                    $scope.environmentrequirements[i][0].to_string += ', ' + titleLowerCase($scope.environmentrequirements[i][5].name) + ',';
                }

                $scope.environmentrequirements[i][0].to_string += ' ' + $scope.environmentrequirements[i][6].name + ' ' + $scope.environmentrequirements[i][7].name + ' ' + $scope.environmentrequirements[i][8].name + ' ';

                if ($scope.environmentrequirements[i][9].name) {
                    $scope.environmentrequirements[i][0].to_string += $scope.environmentrequirements[i][9].name + ' ';
                }

                $scope.environmentrequirements[i][0].to_string += $scope.environmentrequirements[i][10].name;

                $scope.environmentrequirements[i][0].to_string = $scope.environmentrequirements[i][0].to_string.trim();
                $scope.environmentrequirements[i][0].to_string = titleCase($scope.environmentrequirements[i][0].to_string + '.');

                $localStorage.environmentrequirements = $scope.environmentrequirements;
            }
        };
        // END EnvironmentMASTER


        // ProcessMASTER
        $scope.newProcessReq = function () {
            $scope.processrequirements.push([{
                    to_string: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_master) $scope.defined_master = true;
        };

        $scope.removeProcessReq = function (i) {
            $scope.processrequirements.splice(i, 1);
            if ($scope.processrequirements.length === 0) {
                delete $localStorage.processrequirements;
            } else {
                $localStorage.processrequirements = $scope.processrequirements;
            }
            if ($scope.functionalrequirements.length === 0 && $scope.propertyrequirements.length === 0 && $scope.environmentrequirements.length === 0 && $scope.processrequirements.length === 0 && $scope.conditions.length === 0) {
                $scope.defined_master = false;
            }
        };

        $scope.addtoProcessReq = function (i, j, selected) {
            if (selected) {
                if (selected[1] && selected[1].to_string) {
                    $scope.processrequirements[i][j].name = selected[1].to_string;
                } else {
                    if (!selected.name)
                        $scope.processrequirements[i][j].name = selected;
                    else
                        $scope.processrequirements[i][j].name = selected.name;
                }
                if ($scope.processrequirements[i][1].name) {
                    $scope.processrequirements[i][0].to_string = $scope.processrequirements[i][1].name + ', ';
                } else {
                    $scope.processrequirements[i][0].to_string = '';
                }

                $scope.processrequirements[i][0].to_string += $scope.processrequirements[i][2].name + ' ' + $scope.processrequirements[i][3].name + ' ' + $scope.processrequirements[i][4].name + ' ' + $scope.processrequirements[i][5].name;

                $scope.processrequirements[i][0].to_string = $scope.processrequirements[i][0].to_string.trim();
                $scope.processrequirements[i][0].to_string = titleCase($scope.processrequirements[i][0].to_string + '.');

                $localStorage.processrequirements = $scope.processrequirements;
            }
        };
        // END ProcessMASTER


        // All Conditions

        // Condition
        $scope.condition_terms = [
            {
                name: 'If',
            },
            {
                name: 'As soon as',
            },
            {
                name: 'As long as',
            }
        ];

        $scope.newCondition = function () {
            $scope.conditions.push([{
                    id: 'Condition-' + ($scope.conditions.length + 1)
            }, {
                    to_string: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_master) $scope.defined_master = true;
        };

        $scope.removeCondition = function (i) {
            $scope.conditions.splice(i, 1);
            if ($scope.conditions.length === 0) {
                delete $localStorage.conditions;
            } else {
                $localStorage.conditions = $scope.conditions;
            }
            if ($scope.functionalrequirements.length === 0 && $scope.propertyrequirements.length === 0 && $scope.environmentrequirements.length === 0 && $scope.processrequirements.length === 0 && $scope.conditions.length === 0) {
                $scope.defined_master = false;
            }
        };

        $scope.addtoCondition = function (i, j, selected) {
            if (selected) {
                if (!selected.name)
                    $scope.conditions[i][j].name = selected;
                else
                    $scope.conditions[i][j].name = selected.name;

                $scope.conditions[i][1].to_string = $scope.conditions[i][2].name + ' ' + $scope.conditions[i][3].name;
                $scope.conditions[i][1].to_string = $scope.conditions[i][1].to_string.trim();
                $scope.conditions[i][1].to_string = titleCase($scope.conditions[i][1].to_string);
                $localStorage.conditions = $scope.conditions;
            }
        };
        // END Condition



        // LogicMaster
        $scope.logic_terms1 = [
            {
                name: '<compared object>',
            },
            {
                name: '<system>',
            },
            {
                name: '<actor>',
            }
        ];
        $scope.logic_terms2 = [
            {
                name: '<object>',
            },
            {
                name: 'the function <function>',
            }
        ];

        $scope.newLogic = function () {
            $scope.conditions.push([{
                    id: 'Condition-' + ($scope.conditions.length + 1) + '-Logic'
            }, {
                    to_string: 'If'
            }, {
                    name: 'If'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'is'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'the function'
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_master) $scope.defined_master = true;
        };

        $scope.addtoLogic = function (i, j, selected) {
            if (selected) {
                if (!selected.name)
                    $scope.conditions[i][j].name = selected;
                else
                    $scope.conditions[i][j].name = selected.name;

                $scope.conditions[i][1].to_string = $scope.conditions[i][2].name + ' ';
                switch ($scope.conditions[i][3].name) {
                case '<compared object>':
                    $scope.conditions[i][1].to_string = $scope.conditions[i][2].name + ' ' + $scope.conditions[i][4].name + ' ' + $scope.conditions[i][5].name + ' ' + $scope.conditions[i][6].name + ' ' + $scope.conditions[i][7].name;
                    break;
                case '<system>':
                    $scope.conditions[i][1].to_string = $scope.conditions[i][2].name + ' ' + $scope.conditions[i][9].name + ' ' + $scope.conditions[i][11].name;
                    break;
                case '<actor>':
                    $scope.conditions[i][1].to_string = $scope.conditions[i][2].name + ' ' + $scope.conditions[i][10].name + ' ' + $scope.conditions[i][11].name;
                }
                switch ($scope.conditions[i][12].name) {
                case '<object>':
                    $scope.conditions[i][1].to_string += ' ' + $scope.conditions[i][13].name;
                    break;
                case 'the function <function>':
                    $scope.conditions[i][1].to_string += ' ' + $scope.conditions[i][14].name + ' ' + $scope.conditions[i][15].name;
                }
                $scope.conditions[i][1].to_string = $scope.conditions[i][1].to_string.trim();
                $scope.conditions[i][1].to_string = titleCase($scope.conditions[i][1].to_string);
                $localStorage.conditions = $scope.conditions;
            }
        };
        // END LogicMaster


        // EventMaster
        $scope.event_terms = [
            {
                name: 'the event <event>',
            },
            {
                name: '<actor>',
            },
            {
                name: '<system>',
            }
        ];

        $scope.newEvent = function () {
            $scope.conditions.push([{
                    id: 'Condition-' + ($scope.conditions.length + 1) + '-Event'
            }, {
                    to_string: 'As soon as'
            }, {
                    name: 'As soon as'
            }, {
                    name: ''
            }, {
                    name: 'the event'
            }, {
                    name: ''
            }, {
                    name: 'happens'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'the function'
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_master) $scope.defined_master = true;
        };

        $scope.addtoEvent = function (i, j, selected) {
            if (selected) {
                if (!selected.name)
                    $scope.conditions[i][j].name = selected;
                else
                    $scope.conditions[i][j].name = selected.name;

                $scope.conditions[i][1].to_string = $scope.conditions[i][2].name + ' ';
                switch ($scope.conditions[i][3].name) {
                case 'the event <event>':
                    $scope.conditions[i][1].to_string += $scope.conditions[i][4].name + ' ' + $scope.conditions[i][5].name + ' ' + $scope.conditions[i][6].name;
                    break;
                case '<actor>':
                    $scope.conditions[i][1].to_string += $scope.conditions[i][7].name + ' ';
                    break;
                case '<system>':
                    $scope.conditions[i][1].to_string += $scope.conditions[i][8].name + ' ';
                }
                if ($scope.conditions[i][3].name == '<actor>' || $scope.conditions[i][3].name == '<system>') {
                    $scope.conditions[i][1].to_string += $scope.conditions[i][9].name + ' ';
                    switch ($scope.conditions[i][10].name) {
                    case '<object>':
                        $scope.conditions[i][1].to_string += $scope.conditions[i][11].name;
                        break;
                    case 'the function <function>':
                        $scope.conditions[i][1].to_string += $scope.conditions[i][12].name + ' ' + $scope.conditions[i][13].name;
                    }
                }
                $scope.conditions[i][1].to_string = $scope.conditions[i][1].to_string.trim();
                $scope.conditions[i][1].to_string = titleCase($scope.conditions[i][1].to_string);
                $localStorage.conditions = $scope.conditions;
            }
        };
        // END EventMaster


        // TimeMaster

        $scope.time_terms1 = [
            {
                name: 'the/an <object>',
            }, {
                name: '<system> is',
            }, {
                name: '<actor>',
            }, {
                name: '<system>',
            }
        ];

        $scope.time_terms2 = [
            {
                name: 'the',
            }, {
                name: 'an',
            }
        ];

        $scope.newTime = function () {
            $scope.conditions.push([{
                    id: 'Condition-' + ($scope.conditions.length + 1) + '-Time'
            }, {
                    to_string: 'As long as'
            }, {
                    name: 'As long as'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'is'
            }, {
                    name: 'in the state'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'the function'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_master) $scope.defined_master = true;
        };

        $scope.addtoTime = function (i, j, selected) {
            if (selected) {
                if (!selected.name)
                    $scope.conditions[i][j].name = selected;
                else
                    $scope.conditions[i][j].name = selected.name;

                $scope.conditions[i][1].to_string = $scope.conditions[i][2].name + ' ';

                switch ($scope.conditions[i][3].name) {
                case 'the/an <object>':
                    $scope.conditions[i][1].to_string += $scope.conditions[i][4].name + ' ' + $scope.conditions[i][5].name + ' ';
                    break;
                case '<system> is':
                    $scope.conditions[i][1].to_string += $scope.conditions[i][6].name + ' ';
                    break;
                case '<actor>':
                    $scope.conditions[i][1].to_string += $scope.conditions[i][10].name + ' ' + $scope.conditions[i][11].name + ' ';
                    switch ($scope.conditions[i][12].name) {
                    case 'the function <function>':
                        $scope.conditions[i][1].to_string += $scope.conditions[i][13].name + ' ' + $scope.conditions[i][14].name;
                        break;
                    case '<object>':
                        $scope.conditions[i][1].to_string += $scope.conditions[i][15].name;
                    }
                    break;
                case '<system>':
                    $scope.conditions[i][1].to_string += $scope.conditions[i][16].name + ' ' + $scope.conditions[i][17].name + ' ' + $scope.conditions[i][18].name;

                }

                if ($scope.conditions[i][3].name == 'the/an <object>' || $scope.conditions[i][3].name == '<system> is') {
                    $scope.conditions[i][1].to_string += $scope.conditions[i][7].name + ' ' + $scope.conditions[i][8].name + ' ' + $scope.conditions[i][9].name;
                }
                $scope.conditions[i][1].to_string = $scope.conditions[i][1].to_string.trim();
                $scope.conditions[i][1].to_string = titleCase($scope.conditions[i][1].to_string);
                $localStorage.conditions = $scope.conditions;
            }
        };
        // END TimeMaster



        //
        // EARS functions Section
        //


        // Ubiquitous requirements
        $scope.newUbiquitousReq = function () {
            $scope.ubiquitousrequirements.push([{
                    to_string: ''
            }, {
                    name: 'The'
            }, {
                    name: ''
            }, {
                    name: 'shall'
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_ears) {
                $scope.defined_ears = true;
            }
        };

        $scope.removeUbiquitousReq = function (i) {
            $scope.ubiquitousrequirements.splice(i, 1);
            if ($scope.ubiquitousrequirements.length === 0) {
                delete $localStorage.ubiquitousrequirements;
            } else {
                $localStorage.ubiquitousrequirements = $scope.ubiquitousrequirements;
            }
            if ($scope.ubiquitousrequirements.length === 0 && $scope.eventrequirements.length === 0 && $scope.unwantedrequirements.length === 0 && $scope.staterequirements.length === 0 && $scope.optionalrequirements.length === 0 && $scope.complexrequirements.length === 0) {
                $scope.defined_ears = false;
            }
        };

        $scope.addtoUbiquitousReq = function (i, j, selected) {
            if (selected) {
                if (!selected.name)
                    $scope.ubiquitousrequirements[i][j].name = selected;
                else
                    $scope.ubiquitousrequirements[i][j].name = selected.name;

                $scope.ubiquitousrequirements[i][0].to_string = $scope.ubiquitousrequirements[i][1].name + ' ' + $scope.ubiquitousrequirements[i][2].name + ' ' + $scope.ubiquitousrequirements[i][3].name + ' ' + $scope.ubiquitousrequirements[i][4].name + '.';

                $scope.ubiquitousrequirements[i][0].to_string = titleCase($scope.ubiquitousrequirements[i][0].to_string);

                $localStorage.ubiquitousrequirements = $scope.ubiquitousrequirements;
            }
        };
        // END Ubiquitous


        // Event-driven requirements
        $scope.newEventReq = function () {
            $scope.eventrequirements.push([{
                    to_string: ''
            }, {
                    name: 'When'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'the'
            }, {
                    name: ''
            }, {
                    name: 'shall'
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_ears) {
                $scope.defined_ears = true;
            }
        };

        $scope.removeEventReq = function (i) {
            $scope.eventrequirements.splice(i, 1);
            if ($scope.eventrequirements.length === 0) {
                delete $localStorage.eventrequirements;
            } else {
                $localStorage.eventrequirements = $scope.eventrequirements;
            }
            if ($scope.ubiquitousrequirements.length === 0 && $scope.eventrequirements.length === 0 && $scope.unwantedrequirements.length === 0 && $scope.staterequirements.length === 0 && $scope.optionalrequirements.length === 0 && $scope.complexrequirements.length === 0) {
                $scope.defined_ears = false;
            }
        };

        $scope.addtoEventReq = function (i, j, selected) {
            if (selected) {
                if (!selected.name)
                    $scope.eventrequirements[i][j].name = selected;
                else
                    $scope.eventrequirements[i][j].name = selected.name;

                $scope.eventrequirements[i][0].to_string = $scope.eventrequirements[i][1].name + ' ';

                if ($scope.eventrequirements[i][2].name) {
                    $scope.eventrequirements[i][0].to_string += $scope.eventrequirements[i][2].name + ' ';
                }

                $scope.eventrequirements[i][0].to_string += $scope.eventrequirements[i][3].name + ', ' + $scope.eventrequirements[i][4].name + ' ' + $scope.eventrequirements[i][5].name + ' ' + $scope.eventrequirements[i][6].name + ' ' + $scope.eventrequirements[i][7].name + '.';

                $scope.eventrequirements[i][0].to_string = titleCase($scope.eventrequirements[i][0].to_string);

                $localStorage.eventrequirements = $scope.eventrequirements;
            }
        };
        // END Event-driven



        // Unwanted behaviours
        $scope.newUnwantedReq = function () {
            $scope.unwantedrequirements.push([{
                    to_string: ''
            }, {
                    name: 'If'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'then'
            }, {
                    name: 'the'
            }, {
                    name: ''
            }, {
                    name: 'shall'
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_ears) {
                $scope.defined_ears = true;
            }
        };

        $scope.removeUnwantedReq = function (i) {
            $scope.unwantedrequirements.splice(i, 1);
            if ($scope.unwantedrequirements.length === 0) {
                delete $localStorage.unwantedrequirements;
            } else {
                $localStorage.unwantedrequirements = $scope.unwantedrequirements;
            }
            if ($scope.ubiquitousrequirements.length === 0 && $scope.eventrequirements.length === 0 && $scope.unwantedrequirements.length === 0 && $scope.staterequirements.length === 0 && $scope.optionalrequirements.length === 0 && $scope.complexrequirements.length === 0) {
                $scope.defined_ears = false;
            }
        };

        $scope.addtoUnwantedReq = function (i, j, selected) {
            if (selected) {
                if (!selected.name)
                    $scope.unwantedrequirements[i][j].name = selected;
                else
                    $scope.unwantedrequirements[i][j].name = selected.name;

                $scope.unwantedrequirements[i][0].to_string = $scope.unwantedrequirements[i][1].name + ' ';

                if ($scope.unwantedrequirements[i][2].name) {
                    $scope.unwantedrequirements[i][0].to_string += $scope.unwantedrequirements[i][2].name + ' ';
                }

                $scope.unwantedrequirements[i][0].to_string += $scope.unwantedrequirements[i][3].name + ', ' + $scope.unwantedrequirements[i][4].name + ' ' + $scope.unwantedrequirements[i][5].name + ' ' + $scope.unwantedrequirements[i][6].name + ' ' + $scope.unwantedrequirements[i][7].name + ' ' + $scope.unwantedrequirements[i][8].name + '.';

                $scope.unwantedrequirements[i][0].to_string = titleCase($scope.unwantedrequirements[i][0].to_string);

                $localStorage.unwantedrequirements = $scope.unwantedrequirements;
            }
        };
        // END Unwanted behaviours


        // State-driven requirements
        $scope.newStateReq = function () {
            $scope.staterequirements.push([{
                    to_string: ''
            }, {
                    name: 'While'
            }, {
                    name: ''
            }, {
                    name: 'the'
            }, {
                    name: ''
            }, {
                    name: 'shall'
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_ears) {
                $scope.defined_ears = true;
            }
        };

        $scope.removeStateReq = function (i) {
            $scope.staterequirements.splice(i, 1);
            if ($scope.staterequirements.length === 0) {
                delete $localStorage.staterequirements;
            } else {
                $localStorage.staterequirements = $scope.staterequirements;
            }
            if ($scope.ubiquitousrequirements.length === 0 && $scope.eventrequirements.length === 0 && $scope.unwantedrequirements.length === 0 && $scope.staterequirements.length === 0 && $scope.optionalrequirements.length === 0 && $scope.complexrequirements.length === 0) {
                $scope.defined_ears = false;
            }
        };

        $scope.addtoStateReq = function (i, j, selected) {
            if (selected) {
                if (!selected.name)
                    $scope.staterequirements[i][j].name = selected;
                else
                    $scope.staterequirements[i][j].name = selected.name;

                $scope.staterequirements[i][0].to_string = $scope.staterequirements[i][1].name + ' ' + $scope.staterequirements[i][2].name + ', ' + $scope.staterequirements[i][3].name + ' ' + $scope.staterequirements[i][4].name + ' ' + $scope.staterequirements[i][5].name + ' ' + $scope.staterequirements[i][6].name + '.';

                $scope.staterequirements[i][0].to_string = titleCase($scope.staterequirements[i][0].to_string);

                $localStorage.staterequirements = $scope.staterequirements;
            }
        };
        // END State-driven requirements


        // Optional features
        $scope.newOptionalReq = function () {
            $scope.optionalrequirements.push([{
                    to_string: ''
            }, {
                    name: 'Where'
            }, {
                    name: ''
            }, {
                    name: 'the'
            }, {
                    name: ''
            }, {
                    name: 'shall'
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_ears) {
                $scope.defined_ears = true;
            }
        };

        $scope.removeOptionalReq = function (i) {
            $scope.optionalrequirements.splice(i, 1);
            if ($scope.optionalrequirements.length === 0) {
                delete $localStorage.optionalrequirements;
            } else {
                $localStorage.optionalrequirements = $scope.optionalrequirements;
            }
            if ($scope.ubiquitousrequirements.length === 0 && $scope.eventrequirements.length === 0 && $scope.unwantedrequirements.length === 0 && $scope.staterequirements.length === 0 && $scope.optionalrequirements.length === 0 && $scope.complexrequirements.length === 0) {
                $scope.defined_ears = false;
            }
        };

        $scope.addtoOptionalReq = function (i, j, selected) {
            if (selected) {
                if (!selected.name)
                    $scope.optionalrequirements[i][j].name = selected;
                else
                    $scope.optionalrequirements[i][j].name = selected.name;

                $scope.optionalrequirements[i][0].to_string = $scope.optionalrequirements[i][1].name + ' ' + $scope.optionalrequirements[i][2].name + ', ' + $scope.optionalrequirements[i][3].name + ' ' + $scope.optionalrequirements[i][4].name + ' ' + $scope.optionalrequirements[i][5].name + ' ' + $scope.optionalrequirements[i][6].name + '.';

                $scope.optionalrequirements[i][0].to_string = titleCase($scope.optionalrequirements[i][0].to_string);

                $localStorage.optionalrequirements = $scope.optionalrequirements;
            }
        };
        // END Optional features


        // Complex requirements
        $scope.newComplexReq = function () {
            $scope.complexrequirements.push([{
                    to_string: ''
            }, {
                    name: 'When'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'while'
            }, {
                    name: ''
            }, {
                    name: 'where'
            }, {
                    name: ''
            }, {
                    name: 'if'
            }, {
                    name: ''
            }, {
                    name: ''
            }, {
                    name: 'then'
            }, {
                    name: 'the'
            }, {
                    name: ''
            }, {
                    name: 'shall'
            }, {
                    name: ''
            }
            ]);
            if (!$scope.defined_ears) {
                $scope.defined_ears = true;
            }
        };

        $scope.removeComplexReq = function (i) {
            $scope.complexrequirements.splice(i, 1);
            if ($scope.complexrequirements.length === 0) {
                delete $localStorage.complexrequirements;
            } else {
                $localStorage.complexrequirements = $scope.complexrequirements;
            }
            if ($scope.ubiquitousrequirements.length === 0 && $scope.eventrequirements.length === 0 && $scope.unwantedrequirements.length === 0 && $scope.staterequirements.length === 0 && $scope.complexrequirement.length === 0 && $scope.complexrequirement.length === 0) {
                $scope.defined_ears = false;
            }
        };

        $scope.addtoComplexReq = function (i, j, selected) {
            if (selected) {
                $scope.complexrequirements[i][j].name = selected.name;

                $scope.complexrequirements[i][0].to_string = '';

                if ($scope.complexrequirements[i][2].name || $scope.complexrequirements[i][3].name) {
                    $scope.complexrequirements[i][0].to_string += $scope.complexrequirements[i][1].name + ' ' + $scope.complexrequirements[i][2].name + ' ' + $scope.complexrequirements[i][3].name + ', ';
                }

                if ($scope.complexrequirements[i][5].name) {
                    $scope.complexrequirements[i][0].to_string += $scope.complexrequirements[i][4].name + ' ' + $scope.complexrequirements[i][5].name + ', ';
                }

                if ($scope.complexrequirements[i][7].name) {
                    $scope.complexrequirements[i][0].to_string += $scope.complexrequirements[i][6].name + ' ' + $scope.complexrequirements[i][7].name + ', ';
                }

                if ($scope.complexrequirements[i][9].name || $scope.complexrequirements[i][10].name) {
                    $scope.complexrequirements[i][0].to_string += $scope.complexrequirements[i][8].name + ' ' + $scope.complexrequirements[i][9].name + ' ' + $scope.complexrequirements[i][10].name + ' ' + $scope.complexrequirements[i][11].name + ', ';
                }

                $scope.complexrequirements[i][0].to_string += ' ' + $scope.complexrequirements[i][12].name + ' ' + $scope.complexrequirements[i][13].name + ' ' + $scope.complexrequirements[i][14].name + ' ' + $scope.complexrequirements[i][15].name + '.';

                $scope.complexrequirements[i][0].to_string = titleCase($scope.complexrequirements[i][0].to_string);

                $localStorage.complexrequirements = $scope.complexrequirements;
            }
        };
        // END Complex requirements

}]);