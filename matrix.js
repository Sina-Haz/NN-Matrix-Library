function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Matrix{
    
    constructor(rows,columns){
        this.rows = rows;
        this.cols = columns;
        this.data = [];

        for(let i = 0;i < rows;i++){
            this.data[i] = [];
            for(let j = 0; j < columns;j++){
                this.data[i][j] = 0;
            }
        }
    }

    static fromArray(arr){
        let c = new Matrix(arr.length,1);
        for(let i = 0; i < arr.length;i++){
            c.data[i][0] = arr[i];
        }
        return c;
    }
    
    static subtract(a,b){
        //return new matrix that's a-b
        let result = new Matrix(a.rows,a.cols);
        for(let i = 0;i < result.rows;i++){
            for(let j = 0;j < result.cols;j++){
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }
    
    
    
    toArray(){
        let arr = [];
        for(let i = 0;i < this.rows;i++){
            for(let j = 0;j < this.cols;j++){
                arr.push(this.data[i][j]);
            }  
        }
        return arr;
    }
    
    static multiply(a,b){
        //Matrix Product
        if(a.cols !== b.rows){
            console.log("cols and rows don't match for matrix multiplication")
            return undefined;
        }
        let result = new Matrix(a.rows,b.cols);
        for(let i = 0;i < result.rows;i++){
            for(let j = 0; j < result.cols;j++){
                //Val is = to dot product
                result.data[i][j] = 0;
                for (let k = 0; k < a.cols;k++){
                    result.data[i][j] += a.data[i][k]*b.data[k][j];
                }
            }
        }
        return result;
    }

    
    static scale(matrix, n) {
        let result = new Matrix(matrix.rows,matrix.cols);
    
        for (let i = 0;i < matrix.rows;i++){
            for(let j = 0;j < matrix.cols;j++){
                result.data[i][j] = matrix.data[i][j] * n;
            }
        }
        return result;
    }
    
    static elt_multiply(a,b){
        let result = new Matrix(a.rows,a.cols);
        for(let i = 0;i < result.rows;i++){
            for(let j = 0;j < result.cols;j++){
                result.data[i][j] = a.data[i][j] * b.data[i][j];
            }
        }
        return result;
    }
    
    add(n) {
        if (n instanceof Matrix){
            for (let i = 0;i < this.rows;i++){
                for(let j = 0;j < this.cols;j++){
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else{
            for (let i = 0;i < this.rows;i++){
                for(let j = 0;j < this.cols;j++){
                    this.data[i][j] += n;
                }
            }
        }
    }
    
    static add(m1,m2){
        let result = new Matrix(m1.rows,m2.cols);
        for (let i = 0;i < this.rows;i++){
            for(let j = 0;j < this.cols;j++){
                result.data[i][j] += m1.data[i][j] + m2.data[i][j];
            }
        }
        return result;
    }

    static subtract(a,b){
        if(a.rows != b.rows || a.cols != b.cols){throw Error("need to give matrices of same dimension!");}
        let c = new Matrix(a.rows,b.cols);
        for(let i = 0;i < c.rows;i++){
            for(let j = 0;j < c.cols;j++){
                c.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return c;

    }
    
    static randomize(matrix){
        let result = new Matrix(matrix.rows,matrix.cols);
        for (let i = 0;i < matrix.rows;i++){
            for(let j = 0;j < matrix.cols;j++){
                result.data[i][j] = getRandomInt(-10,10);
            }
        }
        return result;
    }
    
    static transpose(a){
        let t = new Matrix(a.cols,a.rows);
        for(let i = 0;i < t.rows;i++){
            for(let j = 0;j < t.cols;j++){
                t.data[i][j] = a.data[j][i];
            }
        }
        return t;
    }
    
    print(){
        console.table(this.data);
    }
    
    //applies some function to every element of the matrix
    map(fn){
        for (let i = 0;i < this.rows;i++){
            for(let j = 0;j < this.cols;j++){
                this.data[i][j] = fn(this.data[i][j],i,j);
            }
        }
    }

    static map(a,fn){
        let result = new Matrix(a.rows,a.cols);
        for(let i = 0;i < a.rows;i++){
            for(let j = 0;j < a.cols;j++){
                result.data[i][j] = fn(a.data[i][j],i,j);
            }
        }
        return result;
    }
    
}

