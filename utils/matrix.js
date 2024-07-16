

class Matrix {
    static from(arr) {
        const newMatrix = new Matrix(arr.length, arr[0].length);
        newMatrix.forEach((i, j) => {
            newMatrix.set(i, j, arr[i][j])
        });
        return newMatrix;
    }

    static getXRotation(degrees) {
        const angle = (degrees * Math.PI) / 180.0;

        const matrix = [
			[ 1, 0, 0 ],
			[ 0, Math.cos(angle), -1.0 * Math.sin(angle) ],
			[ 0, Math.sin(angle), Math.cos(angle) ]
        ];

		return Matrix.from(matrix);
    }

    static getYRotation(degrees) {
        const angle = (degrees * Math.PI) / 180.0;

        const matrix = [
			[ Math.cos(angle), 0, Math.sin(angle) ],
			[ 0, 1, 0 ],
			[ -1.0 * Math.sin(angle), 0, Math.cos(angle) ]
        ];

		return Matrix.from(matrix);
    }

    static getZRotation(degrees) {
        const angle = (degrees * Math.PI) / 180.0;

        const matrix = [
			[ Math.cos(angle), -1.0 * Math.sin(angle), 0 ],
			[ Math.sin(angle), Math.cos(angle), 0 ],
			[ 0, 0, 1 ]
        ];

		return Matrix.from(matrix);
    }

    constructor(n, m) {
        if (n < 1 || m < 1) {
            throw new Error('Invalid size of matrix');
        }

        this.n = n;
        this.m = m;

        this.matrix = new Array(n)
        for (let i = 0; i < n; i++) {
            this.matrix[i] = new Array(m);
            for (let j = 0; j < m; j++) {
                this.set(i, j, 0);
            }
        }
    }

    toString() {
        let s = ``;
        for (let i = 0; i < this.n; i++) {
            let line = `[`;
            for (let j = 0; j < this.m; j++) {
                line += ` ${this.get(i, j)} `;
            }
            line += ']\n';
            s += line;
        }
        return s;
    }

    forEach(callback) {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                callback(i, j, this.matrix[i][j]);
            }
        }
    }

    get(i, j) {
        if (j !== undefined) {
            return this.matrix[i][j];
        }

        return this.matrix[i];
    }

    set(i, j, value) {
        this.matrix[i][j] = value;
    }

    add(matrix) {
        if (this.n !== matrix.n || this.m !== matrix.m) {
            throw new Error('Invalid matrix - size not same')
        }

        const newMatrix = new Matrix(this.n, this.m);
        newMatrix.forEach((i, j) => {
            newMatrix.set(i, j, this.get(i, j) + matrix.get(i, j));
        });

        return newMatrix;
    }

    subtract(matrix) {
        if (this.n !== matrix.n || this.m !== matrix.m) {
            throw new Error('Invalid matrix - size not same')
        }

        const newMatrix = new Matrix(this.n, this.m);
        newMatrix.forEach((i, j) => {
            newMatrix.set(i, j, this.get(i, j) - matrix.get(i, j));
        });

        return newMatrix;
    }

    multiply(matrix) {
        if (this.m !== matrix.n) {
            throw new Error(`Invalid matrix - size not same; this ${this.n}x${this.m}, that ${matrix.n}x${matrix.m}`);
        }

        const newMatrix = new Matrix(this.n, matrix.m);

        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < matrix.m; j++) {
                for (let k = 0; k < matrix.n; k++) {
                    const value = newMatrix.get(i, j);
                    const add = this.get(i, k) * matrix.get(k, j);
                    newMatrix.set(i, j, value + add);
                }
            }
        }

        return newMatrix;
    }
};