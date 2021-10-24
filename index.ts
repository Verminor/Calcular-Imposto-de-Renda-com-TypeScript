interface IPessoa {
    nome: string;
    salarioBruto: number;
    adicionalHoraExtra: number;
    faixaINSS: number;
    descontoINSS: number;
    faixaIR: number;
    descontoIR: number;
    salarioLiquido: number
}

class Pessoa {
    pessoa: IPessoa;

    constructor(nome: string, salario: number, horaExtra: number) {
        this.pessoa = {} as IPessoa
        this.pessoa.nome = nome;
        this.pessoa.salarioBruto = salario;
        this.pessoa.adicionalHoraExtra = this.calculaValorHoraExtra(salario, horaExtra);
        this.pessoa.faixaINSS = this.defineFaixaINSS(salario);
        this.pessoa.descontoINSS = this.calculaDescontoINSS(salario, this.pessoa.faixaINSS);
        this.pessoa.faixaIR = this.defineFaixaIR(salario);
        this.pessoa.descontoIR = this.calculaDescontoIR(salario, this.pessoa.faixaIR, this.pessoa.descontoINSS);
        this.pessoa.salarioLiquido = this.calculaSalarioLiquido(salario, this.pessoa.descontoINSS, this.pessoa.descontoIR, this.pessoa.adicionalHoraExtra);
    }
    calculaSalarioLiquido(salario: number, descontoINSS: number, descontoIR: number, adicionalHoraExtra: number): number {
        return salario - descontoINSS - descontoIR + adicionalHoraExtra;
    }

    calculaValorHoraExtra(salario: number, horaExtra: number) : number {
        let retorno = salario / 200;
        retorno *= 1.5;
        retorno *= horaExtra;
        return retorno;
    }

    defineFaixaINSS(salario: number): number {
        let faixa = 7.5;
        if (salario > 1100 && salario <= 2203.48) {
            faixa = 9;
        } else if (salario > 2203.48 && salario <= 3305.22) {
            faixa = 12;
        } else if (salario > 3305.22) {
            faixa = 14;
        }
        return faixa;
    }

    calculaDescontoINSS(salario: number, faixa: number): number {
        let desconto = salario * (faixa / 100);        
        return desconto;
    }

    defineFaixaIR(salario: number): number {
        let faixa = 0;
        if (salario > 1903.99 && salario <= 2826.65) {
            faixa = 7.5;
        } else if (salario > 2826.65 && salario <= 3751.05) {
            faixa = 15;
        } else if (salario > 3751.05 && salario <= 4664.68) {
            faixa = 22.5;
        } else if (salario > 4664.68) {
            faixa = 27.5;
        } 
        return faixa;
    }

    calculaDescontoIR(salario: number, faixa: number, descontoINSS: number): number {
        let desconto = salario - descontoINSS;
        desconto *= (faixa / 100);
        let parcelaDedutivel = 0;
        switch (faixa) {
            case 7.5:
                parcelaDedutivel = 142.80;
                break;
            case 15:
                parcelaDedutivel = 354.80;
                break;
            case 22.5:
                parcelaDedutivel = 636.13;
                break;
            case 27.5:
                parcelaDedutivel = 869.36;
                break;
        }
        desconto -= parcelaDedutivel;
        return desconto;
    }
}

let pessoa = new Pessoa(process.argv[2], Number(process.argv[3]), Number(process.argv[4]));
console.log(pessoa);