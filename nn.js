
function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

function dsigmoid(y){
    //return sigmoid(x)*(1-sigmoid(x));
    return y*(1-y);
}

function computeNextLayer(curr,weights,bias){
    let res = Matrix.multiply(weights,curr);
    res.add(bias);
    res.map(sigmoid)
    return res;
}

function equal(arr1,arr2){
    if (arr1.length != arr2.length){ return false;}
    for (let i = 0; i < arr1.length;i++){
        if (arr1[i] !== arr2[i]){return false;}
    }
    return true;
}

class NeuralNetwork{
    constructor(input,hidden,output){
        this.input_nodes = input;
        this.hidden_nodes = hidden;
        this.output_nodes = output;
        this.learning_rate = 0.001;

        this.weights_hi = Matrix.randomize(new Matrix(this.hidden_nodes,this.input_nodes));
        this.weights_oh = Matrix.randomize(new Matrix(this.output_nodes,this.hidden_nodes));

        this.bias_h = Matrix.randomize(new Matrix(this.hidden_nodes,1));
        this.bias_o = Matrix.randomize(new Matrix(this.output_nodes,1));

        this.hidden_values = new Matrix(this.hidden_nodes,1);
        this.output_values = new Matrix(this.output_nodes,1);
    }

    feedforward(inputs){
        if(!Array.isArray(inputs)){throw TypeError("Input should be an array!");}
        let input_matr = Matrix.fromArray(inputs);
        //we can compute the next layer by doing weights*prev_layer + bias
        let hidden_matr = computeNextLayer(input_matr,this.weights_hi,this.bias_h);
        this.hidden_values = hidden_matr;

        let output_matr = computeNextLayer(hidden_matr,this.weights_oh,this.bias_o);
        this.output_values = output_matr;

        return output_matr.toArray();
    }

    train(inputs,targets){
        let output = Matrix.fromArray(this.feedforward(inputs));
        targets = Matrix.fromArray(targets);
        let output_errors = Matrix.subtract(targets,output);

        //deltaW = lr*Err(O*(1-O))*H^T 
        let gradients = Matrix.map(output,dsigmoid);

        //originally he has gradients.multiply(output_errors)
        gradients = Matrix.elt_multiply(output_errors,gradients);
        gradients = Matrix.scale(gradients,this.learning_rate);

        let hidden_T = Matrix.transpose(this.hidden_values);
        let weight_oh_deltas = Matrix.multiply(gradients,hidden_T);
        this.weights_oh.add(weight_oh_deltas);
        this.bias_o.add(gradients);

        let hidden_errors = Matrix.multiply(Matrix.transpose(this.weights_oh),output_errors);

        let hidden_gradient = Matrix.map(this.hidden_values,dsigmoid);
        hidden_gradient = Matrix.elt_multiply(hidden_errors,hidden_gradient);
        hidden_gradient = Matrix.scale(hidden_gradient,this.learning_rate);

        let input_T = Matrix.transpose(Matrix.fromArray(inputs));
        let weights_hi_deltas = Matrix.multiply(hidden_gradient,input_T);
        this.weights_hi.add(weights_hi_deltas);
        this.bias_h.add(hidden_gradient);
    }

    setLearningRate(new_rate){
        this.learning_rate = new_rate;
    }
}