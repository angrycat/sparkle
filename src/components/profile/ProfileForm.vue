<template lang="pug">
v-layout(row='' wrap='')
  v-flex(xs12='' sm12='' md12='' lg2='' text-xs-center='' text-sm-center='')
    v-avatar(size='150px')
      img(src='https://avatars0.githubusercontent.com/u/9064066?v=4&s=460')
  v-flex(xs12='' sm12='' md12='' lg10='' pt-4='')
    v-card
      v-form(@submit.prevent='onSave')
        v-card-text(v-for='item in userData' :key='item.key')
            v-text-field(
              :label='item.title'
              v-model='item.value'
              type='text'
              :name='item.key'
              v-validate='item.validate'
              :rules='(!errors.first(item.key)) ? [true] : [errors.first(item.key)]'
              autocomplete="off"
              @input.once='isEdit = true'
            )
        v-card-actions(m-4='')
            v-btn(flat='' @click='switchToBack') Назад
            v-spacer
            v-btn(flat='' type='submit') Сохранить
</template>

<script>
import model from '@/store/modules/models/user'
import _ from 'lodash'

export default {
  name: 'ProfileForm',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      userData: _.cloneDeep(this.items),
      isEdit: false
    }
  },
  computed: {
    dictionary () {
      let custom = {}
      Object.keys(model).forEach(key => {
        custom[key] = model[key].rules
      })
      return {
        custom
      }
    }
  },
  methods: {
    switchToBack () {
      if (this.isEdit) {
        this.$confirm('Изменения не сохранены. Вы дейстивтельно хотите закончить?').then(res => {
          if (res) {
            this.$emit('handleSwitch')
          }
        })
      } else {
        this.$emit('handleSwitch')
      }
    },
    prepareUser () {
      let user = {}
      this.userData.map(item => {
        user[item.key] = item.value
      })
      return user
    },
    onSave () {
      this.$validator.validate().then(result => {
        if (result) {
          this.$emit('handleSave', this.prepareUser())
        }
      })
    }
  },
  mounted () {
    this.$validator.localize('ru', this.dictionary)
  }
}
</script>
