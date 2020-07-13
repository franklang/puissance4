$(document).ready(function() {

    let constant = 4,
        chosenColumn,
        chosenRow,
        whichPlayersTurn = '1',
        whichPlayersMove,
        combinations = [];


    let $grid = $('#grid'); 


    function createCombinations( columnValue, rowValue, constantValue ) {
        let i,
            column,
            row;

        for ( i = 0; i < constantValue; i++ ) {

            // Diagonal: bottom to top/right to left
            // 0: 'c3-r3', 'c2-r2', 'c1-r1', 'c0-r0'
            // 1: 'c4-r4', 'c3-r3', 'c2-r2', 'c1-r1'
            // 2: 'c5-r5', 'c4-r4', 'c3-r3', 'c2-r2'
            // 3: 'c6-r6', 'c5-r5', 'c4-r4', 'c3-r3'
            for ( column = columnValue, row = rowValue;
                  column < columnValue - constantValue, row > rowValue - constantValue;
                  column--, row-- ) {

                combinations.push( [column + i, row + i] );
            }

            // Diagonal: bottom to top/left to right
            // 0: 'c3-r3', 'c4-r2', 'c5-r1', 'c6-r0'
            // 1: 'c2-r4', 'c3-r3', 'c4-r2', 'c5-r1'
            // 2: 'c1-r5', 'c2-r4', 'c3-r3', 'c4-r2'
            // 3: 'c0-r6', 'c1-r5', 'c2-r4', 'c3-r3'
            for ( column = columnValue, row = rowValue;
                  column < columnValue + constantValue, row > rowValue - constantValue;
                  column++, row-- ) {

                combinations.push( [column - i, row + i] );
            }

            // Row: left to right
            // 0: 'c3-r3', 'c2-r3', 'c1-r3', 'c0-r3'
            // 1: 'c4-r3', 'c3-r3', 'c2-r3', 'c1-r3'
            // 2: 'c5-r3', 'c4-r3', 'c3-r3', 'c2-r3'
            // 3: 'c6-r3', 'c5-r3', 'c4-r3', 'c3-r3'
            for ( column = columnValue, row = rowValue;
                  column < columnValue - constantValue, row > rowValue - constantValue;
                  column--, row-- ) {

                combinations.push( [column + i, rowValue] );
            }

            // Column: bottom to top
            // 0: 'c3-r3', 'c3-r2', 'c3-r1', 'c3-r0'
            // 1: 'c3-r4', 'c3-r3', 'c3-r2', 'c3-r1'
            // 2: 'c3-r5', 'c3-r4', 'c3-r3', 'c3-r2'
            // 3: 'c3-r6', 'c3-r5', 'c3-r4', 'c3-r3'
            for ( row = rowValue;
                  row > rowValue - constantValue;
                  row-- ) {

                combinations.push( [columnValue, row + i] );
            }
        }
    }


    function checkCombinations( whichPlayersMove, constantValue ) {
        let i,
            testsAmount = combinations.length,
            testedGoodAmount = 0;

        for (i = 0; i < testsAmount; i++ ) {
            // console.log(i + 1);
            let column = combinations[i][0],
                row = combinations[i][1],
                $testedCell = $('[data-row="' + row + '"]').children('[data-col="' + column + '"][data-owner="player-' + whichPlayersMove + '"]');

            // console.log(column+', '+row);

            if ( $testedCell.length === 1 ) {
                // console.log(column+', '+row+' is GOOD!');
                testedGoodAmount = testedGoodAmount + 1;
                // console.log('testedGoodAmount: ' + testedGoodAmount);
            } else {
                // sinon on remet testedGoodAmount à 0
                testedGoodAmount = 0;
            }

            // si i est un multiple de constantValue (4)
            // "i + 1" pour compenser le fait que i commence à 0
            if ( (i + 1) % constantValue === 0 ) {
                // console.log('testedGoodAmount: '+testedGoodAmount);

                if ( testedGoodAmount === constantValue ) {
                    alert('PLAYER ' + whichPlayersMove + ' WINS!!' );
                } else {
                    testedGoodAmount = 0;
                }
            } else {
              // nada
            }
        }
    }


    // click a radio submits form
    $('input[type="radio"]', '#options').on('click', function() {
        chosenColumn = $(this).attr('value'),
        whichPlayersMove = whichPlayersTurn;
        $('#btnSubmit').click();
    });

    $('.grid-cell', $grid).on('click', function() {
        chosenColumn = $(this).attr('data-col'),
        whichPlayersMove = whichPlayersTurn;
        $('#btnSubmit').click();
    });

    $('body').on('submit', '#play', function() {
        let $filledCell = $grid.find('[data-col="' + chosenColumn + '"]').not('[data-owner]').last();

        // add owner information to filled cell        
        $filledCell.attr('data-owner', 'player-' + whichPlayersTurn);

        // get coordinates of filled cell
        // https://stackoverflow.com/questions/1133770/convert-a-string-to-an-integer
        chosenColumn = $filledCell.data('col'),
        chosenRow = $filledCell.closest('.grid-row').data('row');

        // empty combinations array
        combinations = [];

        // create an array of possible combinations
        createCombinations( chosenColumn, chosenRow, constant );
        // console.log(combinations);

        // test player's move regarding possible combinations
        checkCombinations( whichPlayersMove, constant );

        // disable column if full
        let isFullColumn = $grid.find('[data-row="0"]').has('[data-col="' + chosenColumn + '"][data-owner]');
        if (isFullColumn.length == 1) {
            $('#col-' + chosenColumn, '#options').attr('disabled', '');
        } else {
            // nada
        }

        // TODO: if all columns are full -> ex-aequo!

        // toggle player
        if (whichPlayersTurn != '2') {
            whichPlayersTurn = '2';
            $('#player').find('.number').text('2');
        } else {
            whichPlayersTurn = '1';
            $('#player').find('.number').text('1');
        }

        return false;
    });

    // $('body').on('mouseenter', '.option, .grid-cell', function() {
    //     let dataColValue = $(this).attr('data-col');
    //     $('[data-col="' + dataColValue + '"]').addClass('in-scope');
    // }).on('mouseleave', '.option, .grid-cell', function() {
    //     $('[data-col]').removeClass('in-scope');
    // });
});

// https://stackoverflow.com/questions/22303738/passing-a-math-operator-as-a-parameter
// https://stackoverflow.com/questions/22990503/how-to-convert-data-attribute-value-to-integer-for-in-javascript
// https://www.w3schools.com/jsref/jsref_tostring_number.asp
// https://stackoverflow.com/questions/7037926/javascript-how-to-tell-if-one-number-is-a-multiple-of-another
// https://ayushgp.github.io/Tic-Tac-Toe-Socket-IO/
