// * mock repository 객체를 반복문으로 한번에 생성하기 위한 함수
// * mockRepository의 함수를 모두 명시해줄수 없기때문에 기존에 있는 함수를 Mock 함수로 사용
export const getMockRepository = (targetRepository) => {
    let mockRepository = {};

    Object.getOwnPropertyNames(targetRepository.prototype)
        .filter((key: string) => key !== 'constructor')
        .forEach((key: string) => {
            mockRepository[key] = jest.fn();
        });

    return mockRepository;
};

// * mock repository용 타입 애너테이션
export type MockRepositoryType<T> = Partial<Record<keyof T, jest.Mock>> | Partial<T>;
