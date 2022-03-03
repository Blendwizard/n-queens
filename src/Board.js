// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    //access the row
    //make a counter
    //check if elmt is 1
    //yes, update counter

    //if counter is more than 1
    //there is a conflict

    //[0, 1, 0 , 1]
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var counter = 0;
      row.forEach(function(element) {
        if (element === 1) {
          counter++;
        }
      });
      if (counter > 1) {
        return true;
      }
      return false;

    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //We want to get all arrays in the matrix (entire board)
      var board = this.rows();
      // Iterate over each array in the board
      for (var i = 0; i < board.length; i++) {
        // Check each array for conflict
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict



    hasColConflictAt: function(colIndex) {
    // Create a counter variable
      var counter = 0;
      // Access all of the rows
      var board = this.rows();
      // Check element at the column index for each row
      for (var i = 0; i < board.length; i++) {
      // if element is 1
        if (board[i][colIndex] === 1) {
        // update counter (we found a rook/queen)
          counter++;
        }
      }
      // if the counter is greater than 1
      // return true (conflict found)
      if (counter > 1) {
        return true;
      }
      // otherwise return false
      return false;
    },

    // test if any columns on this board contain conflicts

    //get length of board
    //iterate over board
    //if each i has a column conflict
    //true
    //otherwise, false

    hasAnyColConflicts: function() {
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict


    // Changed starting parameters
    hasMajorDiagonalConflictAt: function(startingRow, startingColumn) {
      // Create the board
      var board = this.rows();

      // Always start at top row unless specified
      var startingRow = 0 || startingRow;

      // Column to start at
      var startingColumn = startingColumn;

      // Store collection of items in the diagonal
      var diagonalItems = [];

      while (this._isInBounds(startingRow, startingColumn)) {
        var nextItemDown = board[startingRow][startingColumn];
        diagonalItems.push(nextItemDown);

        // Get to the next diagonal item down
        startingRow++;
        startingColumn++;
      }

      // Exit isInBounds here
      var rooksFound = 0;
      // Check every item in our collection for Rooks/Queens
      diagonalItems.forEach(function(item) {
        if (rooksFound > 1) {
          return;
        }
        if (item === 1) {
          rooksFound++;
        }
      });

      return (rooksFound > 1);
    },


    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      // Get Number of rows/columns
      var numberOfRowsandColumns = board.length;
      // Call helper function to cover upper right half of matrix
      var result = false;
      for (var col = 0; col < numberOfRowsandColumns; col++) {
        result = this.hasMajorDiagonalConflictAt(0, col);

        // At any point if a collision is found, we should return
        if (result) {
          return result;
        }
      }
      // Start covering lower half of matrix by switching rows
      for (var row = 0; row < numberOfRowsandColumns; row++) {
        result = this.hasMajorDiagonalConflictAt(row, 0);
        if (result) {
          return result;
        }
      }
      return result;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    //change starting parameters
    //create board
    // Always start at top row unless specified
    // Set the column to start at
    // Store collection of items in the diagonal
    // Get to the next diagonal item down
    // Exit isInBounds here
    // Check every item in our collection for Rooks/Queens

    hasMinorDiagonalConflictAt: function(startingRow, startingColumn) {
      // Create the board
      var board = this.rows();

      // Always start at top row unless specified
      var startingRow = 0 || startingRow;

      // Column to start at
      var startingColumn = startingColumn;

      // Store collection of items in the diagonal
      var diagonalItems = [];

      while (this._isInBounds(startingRow, startingColumn)) {
        var nextItemDown = board[startingRow][startingColumn];
        diagonalItems.push(nextItemDown);

        // Get to the next diagonal item down
        startingRow++;
        startingColumn--;
      }

      // Exit isInBounds here
      var rooksFound = 0;
      // Check every item in our collection for Rooks/Queens
      diagonalItems.forEach(function(item) {
        if (rooksFound > 1) {
          return;
        }
        if (item === 1) {
          rooksFound++;
        }
      });

      return (rooksFound > 1);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      // Get Number of rows/columns
      var numberOfRowsandColumns = board.length;
      // Call helper function to cover upper right half of matrix
      var result = false;
      for (var col = numberOfRowsandColumns - 1; col >= 0; col--) {
        result = this.hasMinorDiagonalConflictAt(0, col);

        // At any point if a collision is found, we should return
        if (result) {
          return result;
        }
      }
      // Start covering lower half of matrix by switching rows
      for (var row = 0; row < numberOfRowsandColumns; row++) {
        result = this.hasMinorDiagonalConflictAt(row, numberOfRowsandColumns - 1);
        if (result) {
          return result;
        }
      }
      return result;
    },

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
