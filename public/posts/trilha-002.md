# Trilha 002

## Você já ouviu falar em circuit breaker?

Circuit Breaker é um mecanismo arquitetural que tem como objetivo evitar que uma falha em um serviço se propague para outros serviços. Ele é muito utilizado em sistemas distribuídos, onde a falha de um serviço pode causar uma cascata de falhas em outros serviços.

O circuit breaker possui três estados: fechado, aberto e semi-aberto.

**Fechado:** Nesse estado, o circuit breaker permite que as requisições sejam feitas normalmente.

**Aberto:** Nesse estado, o circuit breaker bloqueia as requisições e retorna um erro imediatamente.

**Semi-aberto:** Nesse estado, o circuit breaker permite que uma requisição seja feita para verificar se o serviço está funcionando. Se a requisição falhar, o circuit breaker volta para o estado aberto. Se a requisição for bem sucedida, o circuit breaker volta para o estado fechado.

Um exemplo de implementação utilizando Typescript:

```typescript
enum CircuitBreakerState {
  Closed,
  Open,
  HalfOpen,
}

export class CircuitBreaker {
  private state: CircuitBreakerState = CircuitBreakerState.Closed;
  private failureThreshold: number = 3;
  private resetTimeout: number = 10000; // milliseconds
  private failureCount: number = 0;

  constructor() {}

  public async execute<T>(fn: () => Promise<T>): Promise<T> {
    switch (this.state) {
      case CircuitBreakerState.Closed:
        // O circuit breaker está fechado, então podemos executar a função.
        try {
          return await fn();
        } catch (error) {
          // A função falhou, então precisamos rastrear a falha.
          this.trackFailure();

          // Se o número de falhas exceder o limite, abra o circuit breaker.
          if (this.failureCount >= this.failureThreshold) {
            console.log(
              `Failure threshold of ${this.failureThreshold} exceeded: ${this.failureCount}`,
            );
            this.openCircuitBreaker();
          }

          // Lançar o erro para quem chama a função.
          throw error;
        }

      case CircuitBreakerState.Open:
        // O circuit breaker está aberto, então precisamos retornar um erro imediatamente.
        console.log('Circuit breaker is open');
        throw new Error('Circuit breaker is open');

      case CircuitBreakerState.HalfOpen:
        // O circuit breaker está semi-aberto, então podemos tentar executar a função novamente.
        try {
          console.log('Circuit breaker is half-open');
          return await fn();
        } catch (error) {
          // A função falhou novamente, então abra o circuit breaker.
          this.openCircuitBreaker();

          // Lançar o erro para quem chama a função.
          throw error;
        } finally {
          // A função foi bem sucedida, então podemos fechar o circuit breaker.
          this.state = CircuitBreakerState.Closed;
          this.failureCount = 0;
        }

      default:
        throw new Error('Unknown circuit breaker state');
    }
  }

  /**
   * Contabilize uma falha.
   */
  private trackFailure(): void {
    this.failureCount++;
    console.log(`Failure count: ${this.failureCount}`);
  }

  /**
   * Abra o circuit breaker.
   */
  private openCircuitBreaker(): void {
    this.state = CircuitBreakerState.Open;
    setTimeout(() => {
      this.state = CircuitBreakerState.HalfOpen;
    }, this.resetTimeout);
  }
}
```

Para utilizar o circuit breaker em um código de exemplo, basta criar uma instância e chamar o método execute passando a função que você deseja executar.

Nesse exemplo, uma exceção é lançada aleatoriamente. Se a exceção for lançada, o circuit breaker contabiliza a falha. Se o número de falhas exceder o limite, o circuit breaker é aberto. Se a exceção não for lançada, o circuit breaker é fechado.

```typescript
import { CircuitBreaker } from './circuit-breaker/ circuitBreaker';

const circuitBreaker = new CircuitBreaker();

async function makeHttpRequest() {
  // aleatoriamente, a função pode lançar um erro.
  if (Math.random() < 0.5) {
    throw new Error('Erro aleatório');
  } else {
    return 'Success!';
  }
}

async function main() {
  try {
    const response = await circuitBreaker.execute(makeHttpRequest);
    console.log(response);
  } catch (error) {
    // console.error(error);
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  for (let i = 0; i < 10; i++) {
    await main();
    await delay(1000);
  }
})();
```

## Dica de Livro: [Construindo uma Carreira em Software](https://amzn.to/40byJ1d)

![livro](https://m.media-amazon.com/images/I/61v+001diYL._SY522_.jpg)

Construindo uma Carreira em Software é um livro que fala sobre como construir uma carreira de sucesso na área de tecnologia. O autor John Sonmez mostra como se destacar no mercado de trabalho e como se tornar um profissional de alto nível.

## Notas do Editor

Uma breve reflexão.

Nos 15 anos de mercado que tenho, se tem algo que me orgulho é a maturidade para lidar com as situações.

Ser uma pessoa autêntica, que luta pelo que acredita é algo que devemos sempre buscar. No entanto não podemos confundir isso com transmitir a sua verdade sem filtros, e sem se preocupar com o impacto que isso pode causar nas pessoas.

Lembre-se, você não é o centro do universo. Sua verdade não necessariamente é a verdade do próximo.

Maturidade significa saber receber informações, processá-las e emitir da maneira mais emocionalmente inteligente possível.

Aprenda com os seus erros. E aprenda com os erros de outras pessoas.

Um abraço,

.

.

.

[Flávio Mendes](https://yotube.com/flaviomendes)
