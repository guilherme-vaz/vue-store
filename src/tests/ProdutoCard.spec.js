import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProdutoCard from '../components/ProdutoCard.vue'


const produtoFake = {
    id: 1,
    nome: 'O Ladrão de Raios',
    descricao: 'Primeiro livro da saga Percy Jackson',
    preco: 39.90,
    imagem: 'https://via.placeholder.com/300x200?text=Livro'
}

describe('ProdutoCard.vue', () => {
    it('exibe nome, descrição e preço formatado', () => {
        const wrapper = mount(ProdutoCard, {
            props: { produto: produtoFake }
        })

        expect(wrapper.text()).toContain(produtoFake.nome)
        expect(wrapper.text()).toContain(produtoFake.descricao)
        expect(wrapper.text()).toContain('R$ 39,90') 

    })

    it('emite evento "add-carrinho" ao clicar no botão', async () => {
        const wrapper = mount(ProdutoCard, {
            props: { produto: produtoFake }
        })

        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('add-carrinho')).toBeTruthy()
        expect(wrapper.emitted('add-carrinho')[0]).toEqual([produtoFake])
    })
})
